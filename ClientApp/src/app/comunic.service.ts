import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicService {

  constructor() { }

  public uniqueArrayByProperty(array, callback) {
    return array.reduce((prev, item) => {
      const v = callback(item);
      if (!prev.includes(v)) prev.push(v)
      return prev
    }, [])
  } 
}
