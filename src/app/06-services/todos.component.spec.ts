import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should call getTodos method and initialize values for todos', () => {
    let todos = [1,2,3];
    // Changing the implementation of getTodos method
    // spyOn(object, 'methodName')
    spyOn(service,'getTodos').and.callFake(() => {
      return Observable.from([ todos ]);
    });

    component.ngOnInit();

    //expect(component.todos.length).toBeGreaterThan(0);
    //expect(component.todos.length).toBe(3);
    expect(component.todos).toBe(todos);
  });

  it('should call add method to add a value to todo property', () => {
    /* let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty();
    }); */
    let spy = spyOn(service, 'add').and.returnValue(Observable.empty());

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add a value to todo property after calling add method', () => {
    let todo = {id: 1};
    let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should throw error if value is not added through add method', () => {
    let errMsg = 'value is not added';
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(errMsg));

    component.add();

    expect(component.message).toBe(errMsg);
  });

  it('should delete the value from todo property if user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT delete the value from todo property if user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});