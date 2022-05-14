class Department {
  public name: string;
  private employees: string[] = [];
  constructor(n: string) {
    this.name = n;
  }
  describe(this: Department) {
    console.log("Department:" + this.name);
  }
  addEmployee(employee: string) {
    // Validation etc
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("Acountting");

accounting.addEmployee("Anna");
accounting.addEmployee("Bob");

// accounting.employees[2] = "Max";

accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();

// const accountingCopy = { name: "Dummy", describe: accounting.describe };

// accountingCopy.describe();
