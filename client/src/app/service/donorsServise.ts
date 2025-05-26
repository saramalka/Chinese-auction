import { Injectable } from '@angular/core';
import { Donor } from '../domain/donor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DonorService {

    constructor(private _http: HttpClient) { }
    donorUrl:string='/api/Donors/'
    getDonorsDataFromServer(): Observable<Donor[]> {
        return this._http.get<Donor[]>(this.donorUrl)
    }

    saveDonorToServer(donor: Donor): Observable<boolean> {
        return this._http.post<boolean>(this.donorUrl, donor)
    }

    deleteDonorFromServer(donor: Donor) {
        return this._http.delete(this.donorUrl + donor.id)
    }
    editDonorFromServer(donor: Donor) {
        return this._http.put(this.donorUrl + donor.id, donor)
    }

    getOneFromServer(id: number): Observable<Donor> {
        return this._http.get<Donor>(this.donorUrl + id)
    }
    post(donor: Donor): Observable<Donor> {
        return this._http.post<Donor>(this.donorUrl, donor)
    }
    updateProduct(donor: Donor) {
        return this._http.put<Donor>(this.donorUrl+ donor.id, donor)
    }
}