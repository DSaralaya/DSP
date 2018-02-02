import { FieldType } from '@ngx-formly/core';
import { UploadOutput } from 'ngx-uploader';
import { Component } from '@angular/core';

@Component({
	selector: 'app-dlscantemplate',
	template: `
		<div class='row'>
		<div class='col-sm-12'>
		   <div class="drop-container">
				<label>
					<input type="file" class='hidden' ngFileSelect [options]="options" (uploadOutput)="uploadAttachment($event,'front')">
						Click here to Upload
				</label>
				<div  *ngIf="frontFile" >
					<img [src]="frontFile[0]">
				</div>
			</div>
		</div>
		<div class='col-sm-12'>
			<div class="drop-container">
				<label>
					<input type="file" class='hidden' ngFileSelect [options]="options" (uploadOutput)="uploadAttachment($event,'back')">
						Click here to Upload
				</label>
				<div  *ngIf="backFile">
					<img [src]="backFile[0]">
				</div>
	     	</div>
		</div>
</div>
    `
})
export class DriverLicesenceScanComponent extends FieldType {
	frontFile: any;
	backFile: any;

	constructor() {
		super();
	}

	uploadAttachment(output: UploadOutput, whichImage: string): void {
		if (whichImage === 'front' && output.file) {
			this.frontFile = [];
			this.previewImage(output.file).then((response) => {
				this.frontFile.push(response);
			});
		} else if (output.file) {
			this.backFile = [];
			this.previewImage(output.file).then((response) => {
				this.backFile.push(response);
			});
		}
	}

	previewImage(file: any) {
		const fileReader = new FileReader();
		return new Promise((resolve) => {
			if (file.nativeFile) {
				fileReader.onload = function(e: any) {
					resolve(fileReader.result);
				};
				fileReader.readAsDataURL(file.nativeFile);
			}
		});
	}

	b64toBlob(b64Data) {
		const contentType = 'image/jpeg';
		const sliceSize = 512;
		const byteCharacters = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg|JPG);base64,/, ''));
		const byteArrays = [];
		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);
			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}
		const blob = new Blob(byteArrays, { type: contentType });
		return blob;
	}
}
