import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

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
});