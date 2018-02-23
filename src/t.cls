global with sharing class DSPController {
    public String id { get; set; }
    public String ut { get; set; }

 public DSPController() {
    Cookie c_id = null;
    Cookie c_ut = null;
    c_id = ApexPages.currentPage().getCookies().get('id');
    c_ut = ApexPages.currentPage().getCookies().get('ut');
    this.id = String.valueOf(c_id.getValue());
    //this.ut = String.valueOf(c_ut.getValue()); 
}

@RemoteAction
global static Map <String, String> saveAppFields(Map <String, String> params) {
    Map <String, String> appData = new Map<String, String>();
    System.debug('---params---' + params);
    String applicationData = params.get('Application__c');
    String identData = params.get('Identity_Information__c');
    String aboutAccData = params.get('About_Account__c');
    String empData = params.get('Employment_Information__c');

    //String model = params.get('model');
    Application__c appObj = (Application__c) System.JSON.deserialize(applicationData, Application__c.class);
    Identity_Information__c identObj = (Identity_Information__c) System.JSON.deserialize(identData, Identity_Information__c.class);
    About_Account__c abtObj = (About_Account__c) System.JSON.deserialize(aboutAccData, About_Account__c.class);
    Employment_Information__c empObj = (Employment_Information__c) System.JSON.deserialize(empData, Employment_Information__c.class);
    System.debug('---appObj---' + appObj);
    System.debug('---identObj---' + identObj);
    update appObj;

    update identObj;
    update abtObj;
    update empObj;
    appData.put('status', 'true');
    return appData;
}

@RemoteAction
global static Map <String, String> saveFormFields(Map <String, String> params) {
    String jsonAttachment = params.get('json');
    String subProductCode = params.get('subProductCode');
    String page = params.get('pageName');
    String pageName = params.get('subProductCode') + '-' + params.get('pageName');
    Id productId;
    String subProdcutCode;
    Attachment objAttachment;
    Map <String, String> appData = new Map<String, String>();
    try {
        //Get the product record
        List <DSP_Product__c> lstProduct =[select Id, Sub_Product_Code__c from DSP_Product__c where Sub_Product_Code__c = : subProductCode LIMIT 1];

        if (lstProduct.size()> 0) {
            productId = lstProduct[0].Id;

            System.debug('productId ==>' + productId);
            //Check if Json Already exists as an attachment in Application object
            List <Attachment> lstAttachment =[select Id, Body from attachment where ParentId = : productId AND Name = : pageName LIMIT 1];
            System.debug('lstAttachment.size() ==>' + lstAttachment.size());
            if (lstAttachment.size()> 0) {
                objAttachment = lstAttachment[0];
                objAttachment.Body = Blob.valueof(jsonAttachment);
                update objAttachment;
                System.debug('Attachment exists and is updated');
            } else {
                subProdcutCode = lstProduct[0].Sub_Product_Code__c;
                Attachment newAttachment = new Attachment(
                    Name = pageName,
                    Body = Blob.valueof(jsonAttachment),
                    ParentId = productId
                );
                insert newAttachment;
                if (page != 'pageflow') {
                    setPageFlow(subProductCode, page, lstProduct, true);
                }

                System.debug('New attachment created');
            }

        }
        appData.put('Status', 'true');
        return appData;
    } catch (exception ex) {
        System.debug('Exception ==>' + ex.getMessage());
        appData.put('error', ex.getMessage());
        return appData;
    }

}

 public static List <SObject> readFieldSet(String fieldSetName, String ObjectName, String ids) {
    Map <String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe();
    Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(ObjectName);
    Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();
    Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(fieldSetName);
    String Query = 'Select id';
    for (Schema.FieldSetMember fieldSetMemberObj: fieldSetObj.getFields()) {
        Query += ',' + fieldSetMemberObj.getFieldPath();
    }
    System.debug('Query ' + Query);
    Query += ' from ' + ObjectName + ' where id =: ids limit 1';
    System.debug('Query ------------' + Query);
    return Database.query(Query);
}
@RemoteAction
global static String getAppFields(Map <String, String> params) {
    Map <String, String> appData = new Map<String, String>();
    String subProductCode = params.get('subProductCode');
    String pageName = params.get('pageName');
    String dspId = params.get('id');
    String fileName = subProductCode + '-' + pageName;
    JSONGenerator gen = JSON.createGenerator(true);
    gen.writeStartObject();

    try {
        if (!String.isBlank(dspId)) {
            List <Application__c> lstProduct =[select Id, Sub_Product__c from Application__c where Id = : dspId LIMIT 1];
            List <About_Account__c> lstabt =[select Id from About_Account__c where Application__c = : dspId LIMIT 1];
            List <Identity_Information__c> lstiden =[select Id from Identity_Information__c where Application__c = : dspId LIMIT 1];
            List <Employment_Information__c> lstempt =[select Id from Employment_Information__c where Application__c = : dspId LIMIT 1];
            subProductCode = lstProduct[0].Sub_Product__c;
            fileName = subProductCode + '-' + pageName;
            List <Application__c> application = readFieldSet('Application', 'Application__c', dspId);
            List <Employment_Information__c> employment = readFieldSet('Employment_Information', 'Employment_Information__c', lstempt[0].id);
            List <Identity_Information__c> identity = readFieldSet('Identity_Information', 'Identity_Information__c', lstiden[0].id);
            List <About_Account__c> aboutaccount = readFieldSet('About_Account', 'About_Account__c', lstabt[0].id);
            gen.writeFieldName('model');
            gen.writeStartObject();
            gen.writeObjectField('Application__c', application[0]);
            gen.writeObjectField('Employment_Information__c', employment[0]);
            gen.writeObjectField('Identity_Information__c', identity[0]);
            gen.writeObjectField('About_Account__c', aboutaccount[0]);
            gen.writeEndObject();
        }
        //Get the product record
        List <DSP_Product__c> lstProduct =[select Id, Sub_Product_Code__c from DSP_Product__c where Sub_Product_Code__c = : subProductCode LIMIT 1];
        if (lstProduct.size()> 0) {
            Id prtId = lstProduct[0].Id;
            String pageflowAttName = subProductCode + '-' + 'pageflow';

            //Get page flow attachment
            List <Attachment> pageFlowAttachment =[select Id, Body from attachment where ParentId = : prtId AND Name = : pageflowAttName LIMIT 1];
            if (pageFlowAttachment.size()> 0) {
                if (pageFlowAttachment[0].body != null) {
                    //appData.put('pageflow',pageFlowAttachment[0].Body.toString());  
                    // Map<String, String> b = (Map<String,String>) JSON.deserialize(Body.toString(), Map<String,String>.class);
                    gen.writeObjectField('pageflow', pageFlowAttachment[0].Body.toString());

                } else {
                    appData.put('pageflow', 'null');
                }
            }

            //Get Page speicific attachment
            List <Attachment> lstAttachment =[select Id, Body from attachment where ParentId = : prtId AND Name = : fileName LIMIT 1];
            System.debug('lstAttachment.size() ==>' + lstAttachment.size());
            if (lstAttachment.size()> 0) {
                Blob bdy = lstAttachment[0].body;
                if (bdy != null) {
                    gen.writeObjectField('fields', bdy.toString());
                } else {
                    appData.put('fields', 'null');
                }

            }
        }
        gen.writeEndObject();

        return gen.getAsString();
    } catch (exception ex) {
        gen.writeEndObject();
        System.debug('Exception ==>' + ex.getMessage());
        appData.put('fields', 'null');
        appData.put('pageflow', 'null');
        appData.put('error', ex.getMessage());
        return gen.getAsString();
    }
}


@RemoteAction
global static Map <String, String> getPageNamesBySubProduct(Map <String, String> params) {
    Map <String, String> appData = new Map<String, String>();
    String subProductCode = params.get('subProductCode');
    String file = subProductCode + '-' + 'pageflow';
    try {
        System.debug('pae ==>' + file);
        List <DSP_Product__c> lstProduct =[select Id from DSP_Product__c where Sub_Product_Code__c = : subProductCode LIMIT 1];
        if (lstProduct.size()> 0) {
            Id prtId = lstProduct[0].Id;
            List <Attachment> lstAttachment =[Select Id, Name, Body from Attachment where Name = : file and ParentId = : prtId];
            if (lstAttachment.size()> 0) {
                appData.put('body', lstAttachment[0].body.toString());
            }
        }
        return appData;


    } catch (exception ex) {
        System.debug('Exception ==>' + ex.getMessage());
        appData.put('body', 'null');
        return appData;
    }
}

@RemoteAction
global  static Map <String, String> getAllSubProducts() {
	Map <String, String> appData = new Map<String, String>();
    try {
		
        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartArray();

        List <DSP_Product__c> lstProduct =[select Id, Product__c, Sub_Product__c, Sub_Product_Code__c from DSP_Product__c];
        for (DSP_Product__c prd: lstProduct) {
            gen.writeStartObject();
            gen.writeStringField('Product__c', prd.Product__c);
            gen.writeStringField('Sub_Product__c', prd.Sub_Product__c);
            gen.writeStringField('Sub_Product_Code__c', prd.Sub_Product_Code__c);
            gen.writeEndObject();
        }
        gen.writeEndArray();
		appData.put('body',gen.getAsString());
        return appData;

    } catch (exception ex) {
        System.debug('Exception' + ex.getMessage());
        appData.put('body','');
		return  appData;
    }
}

@RemoteAction
global static Map <String, String> DeletePage(Map <String, String> params) {
    Map <String, String> appData = new Map<String, String>();
    String subProductCode = params.get('subProductCode');
    String pageName = params.get('pageName');
    String file = subProductCode + '-' + pageName;
    List <DSP_Product__c> lstProduct =[select Id, Sub_Product_Code__c from DSP_Product__c where Sub_Product_Code__c = : subProductCode LIMIT 1];
    Id prtId = lstProduct[0].Id;
    List <Attachment> lstAttachment =[Select Id, Name, body from Attachment where Name = : file and ParentId = : prtId];
    if (lstAttachment.size()> 0) {
        delete lstAttachment;
        setPageFlow(subProductCode, pageName, lstProduct, false);
    }
    appData.put('Status', 'true');
    return appData;

}
private static void checkPageFlow(String subProductCode,String fileName,Id prtId)
{
	String file = subProductCode + '-' + 'pageflow';
	List <Attachment> lstAttachment =[Select Id, Name, body from Attachment where Name = : file and ParentId = : prtId];
	if (lstAttachment.size() == 0) {
		    PageFlow ob = new PageFlow();
            ob.path = fileName;
			List<PageFlow> newPF=new List<PageFlow>();
			newPF.add(ob);
            Attachment newAttachment = new Attachment(
                Name = file,
                Body = Blob.valueof(System.JSON.serialize(newPF)),
                ParentId = prtId
            );
            insert newAttachment;
     }
}

 private static void setPageFlow(String subProductCode, String fileName, List <DSP_Product__c> lstProduct, Boolean isInsert) {
    String file = subProductCode + '-' + 'pageflow';
    Id prtId = lstProduct[0].Id;
    String pageflowAttName = subProductCode + '-' + 'pageflow';
	checkPageFlow(subProductCode,fileName,prtId);
    List <Attachment> FlowAttachment =[select Id, name from attachment where ParentId = : prtId LIMIT 50];

    if (FlowAttachment.size()> 0) {
        List <Attachment> lstAttachment =[Select Id, Name, body from Attachment where Name = : file and ParentId = : prtId];
        //checking if there is no page flow create json
         System.debug('lstAttachment' + lstAttachment);
        List <PageFlow> flows = (List<PageFlow> ) System.JSON.deserialize(lstAttachment[0].body.toString(), List<PageFlow> .class);
        System.debug('flows' + flows);
	    Boolean isExist = false;
        List <string> pagenames = new List<string>();
        List <PageFlow> newFlow = new List<PageFlow>();
        Integer index = 0;
        for (Attachment attch: FlowAttachment) {
			
            pagenames.add(attch.name);
        }

        System.debug('pagenames' + pagenames);
        for (PageFlow item: flows) {
            
			if (item.path == fileName) {
                isExist = true;
            }
			
            if (pagenames.indexOf((subProductCode + '-' + item.path))>=0) {
				System.debug('----' );
                item.prevPage = (index != 0 ? flows[index - 1].path : '');
                item.nextPage = ((index + 1) <flows.size() ? flows[index + 1].path : '');
				System.debug('----'+item );
                newFlow.add(item);
				System.debug('--newFlow--'+newFlow );

            }
            index++;
        }

        if (!isExist && isInsert) {
            newFlow[newFlow.size() - 1].nextPage = fileName;
            PageFlow ob = new PageFlow();
            ob.path = fileName;
            ob.prevPage = newFlow[newFlow.size() - 1].path;
            newFlow.add(ob);
        }
        System.debug('newFlow' + newFlow);
        Attachment objAttachment = lstAttachment[0];
        objAttachment.Body = Blob.valueof(System.JSON.serialize(newFlow));
        update objAttachment;
        System.debug('Page flow attachement exists and is updated');
    }
}

public class PageFlow {
  public String path { get; set; }
  public String prevPage { get; set; }
  public String nextPage { get; set; }
 }

}