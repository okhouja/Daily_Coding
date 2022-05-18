type Admin = {
  name: string;
  privilages: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployess extends Admin, Employee{}

type ElevatedEmployess = Admin & Employee;

const e1: ElevatedEmployess = {
  name: "Omar",
  privilages: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
