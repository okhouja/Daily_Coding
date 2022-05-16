class Department {
  //   private readonly id: string;
  //   public name: string;
  //   private employees: string[] = [];
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
  addEmployee(employee: string) {
    // Validation etc
    // this.id = "d2";
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AcounttingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }

  addEmployee(name: string) {
    if (name === "Omar") {
      return;
    }
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("d1", ["Omar"]);

it.addEmployee("Anna");
it.addEmployee("Bob");

// it.employees[2] = "Max";

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);

const accounting = new AcounttingDepartment("d2", []);

accounting.addReport("Something went wrong!...");

accounting.addEmployee("Maxi");
accounting.addEmployee("Bob");

accounting.printReports();
accounting.printEmployeeInformation();

// const accountingCopy = { name: "Dummy", describe: accounting.describe };

// accountingCopy.describe();
