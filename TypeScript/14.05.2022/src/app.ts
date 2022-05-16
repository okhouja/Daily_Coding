class Department {
  //   private id: string;
  //   public name: string;
  private employees: string[] = [];
  constructor(private id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
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

const accounting = new Department("d1", "Acountting");

accounting.addEmployee("Anna");
accounting.addEmployee("Bob");

// accounting.employees[2] = "Max";

accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();

// const accountingCopy = { name: "Dummy", describe: accounting.describe };

// accountingCopy.describe();
