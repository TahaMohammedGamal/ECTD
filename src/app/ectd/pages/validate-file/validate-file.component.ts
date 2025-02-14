import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidateUsecase } from '../../domain/usecases/validate.usecase';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import { MarkdownModule } from 'ngx-markdown';




@Component({
  selector: 'app-validate-file',
  standalone:true,
  imports:[RouterModule,FormsModule,ReactiveFormsModule,MarkdownModule],
  templateUrl: './validate-file.component.html',
  styleUrl: './validate-file.component.scss',
})

export class ValidateFileComponent implements OnInit  {
  @ViewChild('textArea', { static: false }) textAreaDiv: ElementRef;
  fileForm: FormGroup;
  selectedFile: File | null = null;
  textareaField:AbstractControl;
  submitted:boolean=false;
  markdownContent = `
      | Header 1 | Header 2 |
      |----------|----------|
      | Row 1    | Data 1   |
      | Row 2    | Data 2   |
    `;

  constructor(
    private fb: FormBuilder,
    private validateUsecase:ValidateUsecase,
    private sanitizer: DomSanitizer
  ) {
    
  }
  ngOnInit(): void {
    this.fileForm = this.fb.group({
      textareaField: ['']
    });

    this.textareaField=this.fileForm.controls['textareaField'];

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.textAreaDiv.nativeElement.innerHTML='';
      this.submitted=true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.validateUsecase.excute(formData).subscribe(res=>{
        const unsafeString = res;
        this.submitted=false;
        res.analysis.forEach(async (re, index) => {
          this.textAreaDiv.nativeElement.innerHTML = this.sanitizer.bypassSecurityTrustHtml(await marked.parse(re.output));
        });
      })
    }
  }

  getFormattedText(text:string) {
    return text
      .replace(/### (.*)/g, '<h3>$1</h3>') // Replace ### with <h3>
      .replace(/#### (.*)/g, '<h4>$1</h4>') // Replace #### with <h4>
      .replace(/---/g, '<hr>') // Replace --- with <hr>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Replace ** with <strong>
  }
}
