import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-importador',
  templateUrl: './importador.component.html',
  styleUrls: ['./importador.component.css']
})
export class ImportadorComponent implements OnInit {

  constructor() { }

  @ViewChild('file') public file: HTMLInputElement;
  public hoje = Date.now();

  public lista: string[] = [];
  public nomeArquivo: string = '';

  ngOnInit(): void {

  }

  confirmFileSubmit(files: FileList) {


    let file = files[0];
    this.nomeArquivo = file.name;
    console.log(file);


    var reader = new FileReader();

    reader.onload = (e) => {
      let text: any = reader.result;
      let primeiraLinha = text.split('\n').shift();
      this.lista = primeiraLinha.split(';');
    }


    reader.readAsText(file);             // or whatever encoding you're using
    // // UTF-8 is default, so this argument 
  }

}
