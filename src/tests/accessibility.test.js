import fs from "fs";
import path from "path";
import jestAxe from "jest-axe";

const { axe, toHaveNoViolations } = jestAxe;
expect.extend(toHaveNoViolations);

test("index.html should have no accessibility violations", async () => {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  document.documentElement.innerHTML = html;

  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});

test("settingspage.html should have no accessibility violations", async () => {
  const html = fs.readFileSync(path.join(process.cwd(), "settingspage.html"), "utf8");
  document.documentElement.innerHTML = html;

  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});

test("trainingmode.html should have no accessibility violations", async () => {
  const html = fs.readFileSync(path.join(process.cwd(), "trainingmode.html"), "utf8");
  document.documentElement.innerHTML = html;

  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});

test("overviewpage.html should have no accessibility violations", async () => {
  const html = fs.readFileSync(path.join(process.cwd(), "overviewpage.html"), "utf8");
  document.documentElement.innerHTML = html;

  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
}); 

test("pomodoromode.html should have no accessibility violations", async () => {
  const html = fs.readFileSync(path.join(process.cwd(), "pomodoromode.html"), "utf8");
  document.documentElement.innerHTML = html;

  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});


