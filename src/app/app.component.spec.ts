import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent,
        mockSpinner;
    beforeEach(() => {
        mockSpinner = jasmine.createSpyObj("Spinner", ["show", "hide"]);
        component = new AppComponent(mockSpinner);
    });
});
