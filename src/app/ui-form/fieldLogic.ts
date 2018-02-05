import { ControlProperties } from './controlproperties';

export interface FieldLogic {
	Id?: String;
	Product__c?: String;
	DSP_Field_Name__c?: String;
	RecType__c?: String;
	Sub_Products__c?: String;
	sObject__c?: String;
	Field_Name__c?: String;
	Field_Label__c?: String;
	Field_Order__c?: String;
	OwnerId?: String;
	IsDeleted?: String;
	Name?: String;
	RecordTypeId?: String;
	CreatedDate?: String;
	CreatedById?: String;
	LastModifiedDate?: String;
	LastModifiedById?: String;
	SystemModstamp?: String;
	LastViewedDate?: String;
	LastReferencedDate?: String;
	Alternate_placeholder__c?: String;
	Application_Version__c?: String;
	Channel__c?: String;
	Data_OptionsTypes__c?: String;
	Data_template__c?: String;
	Datatype_Form__c?: String;
	Datatype_html__c?: String;
	Device_Type__c?: String;
	Field_link__c?: String;
	Focus_field__c?: String;
	IsDisplayed__c?: boolean;
	IsMember__c?: boolean;
	IsRequired__c?: boolean;
	Label_Name__c?: String;
	Label__c?: String;
	Label_short__c?: String;
	Length__c?: String;
	OptionsTypes__c?: String;
	Order__c?: number;
	Page_Flow_Sequence__c?: String;
	Page_Name_Code__c?: String;
	Page_Name__c?: String;
	Page_Type__c?: String;
	Picklist_Values__c?: String;
	Section_Type__c?: String;
	Value__c?: String;
	className_Field__c?: String;
	className_fieldGroup__c?: String;
	className_template__c?: String;
	expressionProperties_Fields__c?: String;
	expressionProperties_Section__c?: String;
	hideExpression_FieldGroup__c?: String;
	hideExpression_Fields__c?: String;
	hideExpression_Section__c?: String;
	template__c?: String;
}
export class FieldLogicList {
	droppedControls: ControlProperties[] = [];
	fieldLogic: FieldLogic[] = [];
	fcount: any = 10;
	genrateFieldLogic(controls) {
		this.droppedControls = controls;
		this.droppedControls.forEach((item) => {
			if (item.name === 'section') {
				const section = {
					Device_Type__c: 'All',
					IsDisplayed__c: true,
					IsMember__c: false,
					IsRequired__c: false,
					className_Field__c: item.className,
					template__c: item.template,
					RecType__c: 'Section Labels',
					Section_Type__c: item.sectionName
				};
				this.fieldLogic.push(section);
				const sectionOrder = {
					Device_Type__c: 'All',
					IsDisplayed__c: true,
					IsMember__c: false,
					IsRequired__c: false,
					Order__c: this.fcount++,
					RecType__c: 'Section Order',
					Section_Type__c: item.sectionName
				};
				this.fieldLogic.push(sectionOrder);
			}
			item.controls.forEach((child) => {
				const fieldLogic = {
					DSP_Field_Name__c: child['dspname'],
					Device_Type__c: 'All',
					IsDisplayed__c: true,
					IsMember__c: false,
					IsRequired__c: child.required,
					Label__c: child.label,
					RecType__c: 'Field Logic',
					Section_Type__c: item.sectionName
				};
				this.fieldLogic.push(fieldLogic);
			});
		});

		console.log(this.fieldLogic);
	}
}
