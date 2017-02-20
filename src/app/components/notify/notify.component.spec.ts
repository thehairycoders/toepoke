// import { NotifyComponent } from './notify.component';
// import { async, inject, TestBed } from '@angular/core/testing';
// import { MaterialModule } from '@angular/material';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
// /* tslint:disable:no-unused-variable */

// class MockStore {
//     select() {
//         return Observable.of({
//             notifyState: {
//                 message: 'Check my sweet message'
//             }
//         });
//     }
// }


// describe('NotifyComponent', () => {

//     let fixture;

//     beforeEach(() => {

//         TestBed.configureTestingModule({
//             declarations: [
//                 NotifyComponent
//             ],
//             imports: [
//                 MaterialModule.forRoot()
//             ],
//             providers: [
//                 { provide: Store, useClass: MockStore }
//             ]
//         });

//     });

//     it('Should show message', async(inject([], () => {
       
//         fixture = TestBed.createComponent(NotifyComponent);
//         fixture.detectChanges();

//         fixture.whenStable()
//             .then(() => {
//                 fixture.detectChanges();
//                 return fixture.whenStable();
//             })
//             .then(() => {
//                 const compiled = fixture.debugElement.nativeElement;
//                 expect(compiled.querySelector('body').innerText).toEqual('Check my sweet message');
//             });
//     })));

// });
