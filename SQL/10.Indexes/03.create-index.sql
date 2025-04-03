-- CREATE INDEX salaryidx ON users(salary);

-- Use UNIQUE when you want to create a unique column like email address...
-- and when you create UNIQUE, you already create an index for it."
CREATE UNIQUE INDEX salaryidx ON users(salary); 

-- DROP INDEX salaryidx;