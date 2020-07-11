
class Employee {
  private _fullName: string

  get fullName() :string {
    return this._fullName
  }

  set fullName(val: string) {
    this._fullName = val
  }

  setFullName() {

  }
}

const employee = new Employee()
console.log(employee)


