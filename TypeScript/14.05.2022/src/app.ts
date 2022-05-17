class Department {
  static fiscalYear = 2020;
  //   private readonly id: string;
  //   public name: string;
  //   private employees: string[] = [];
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // console.log(Department.fiscalYear);
  }
  static createEmployee(name: string) {
    return { name: name };
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
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name === "Omar") {
      return;
    }
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Maxi");
console.log(employee1,Department.fiscalYear);


const it = new ITDepartment("d1", ["Omar"]);

it.addEmployee("Anna");
it.addEmployee("Bob");

// it.employees[2] = "Max";

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);

const accounting = new AcounttingDepartment("d2", []);

accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something went wrong!...");

console.log(accounting.mostRecentReport);

accounting.addEmployee("Maxi");
accounting.addEmployee("Bob");

accounting.printReports();
accounting.printEmployeeInformation();

// const accountingCopy = { name: "Dummy", describe: accounting.describe };

// accountingCopy.describe();
