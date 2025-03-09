import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidateUsecase } from '../../domain/usecases/validate.usecase';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import { MarkdownModule } from 'ngx-markdown';
import { ModuleLookupUsecase } from '../../domain/usecases/module-lookup.usecase';
import { ModuleItemsList, ModuleList } from '../../domain/usecases/request-response/response';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ModuleItemsLookupUsecase } from '../../domain/usecases/module-items-lookup.usecase';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-validate-file',
  standalone:true,
  imports:[RouterModule,FormsModule,ReactiveFormsModule,MarkdownModule
    ,CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastrModule,
    MatProgressSpinnerModule ],
      providers: [ToastrService],
  templateUrl: './validate-file.component.html',
  styleUrl: './validate-file.component.scss',
})

export class ValidateFileComponent implements OnInit  {
  @ViewChild('textArea', { static: false }) textAreaDiv: ElementRef;
  fileForm: FormGroup;
  selectedFile: File | null = null;
  textareaField:AbstractControl;
  submitted:boolean=false;
  modules:ModuleList[]=[];
  moduleItems:ModuleItemsList[]=[];
  selectedModule:number;
  selectedItem:number;
  convertedHtml : SafeHtml
  isLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private validateUsecase:ValidateUsecase,
    private sanitizer: DomSanitizer,
    private moduleLookupUsecase: ModuleLookupUsecase,
    private moduleItemsLookupUsecase:ModuleItemsLookupUsecase,
    private toastrService: ToastrService
  ) {
    
  }
  ngOnInit(): void {
    this.fileForm = this.fb.group({
      textareaField: ['']
    });

    this.textareaField=this.fileForm.controls['textareaField'];
    this.getModuleList();
    this.getModuleItemsList();
  }

  getModuleList(){
    this.moduleLookupUsecase.excute().subscribe((data) => {
      this.modules = data;
      this.selectedModule = this.modules[2].id;
    },
    (error) => {
      console.error('Error fetching dropdown data:', error);
    });
  }
  getModuleItemsList(){
    this.moduleItemsLookupUsecase.excute().subscribe((data) => {
      this.moduleItems = data;
      this.selectedItem = this.moduleItems[0].id;
    },
    (error) => {
      console.error('Error fetching dropdown data:', error);
    });
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
      this.isLoading= true;      
      this.textAreaDiv.nativeElement.innerHTML='';
      this.submitted=true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('itemID', this.selectedItem.toString());
      this.validateUsecase.excute(formData).subscribe(res=>{
        const unsafeString = res;
        this.submitted=false;
        res.analysis.forEach(async (re, index) => {
          this.convertedHtml=this.sanitizer.bypassSecurityTrustHtml(await marked.parse(re.output));
          this.isLoading= false;
        });
      },
      (err:any)=>{
        this.toastrService.error('Something went wrong , please contact support');
        this.isLoading= false;
      }
    
    )
    }
  }
}
