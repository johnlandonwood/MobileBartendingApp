import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import BartendingCompany from "./models/bartendingCompanyModel.js";

async function createCompanies(numCompanies) {
  await mongoose.connect('mongodb://localhost:27017/bartending', {
    useNewUrlParser: true,
  });

  for (let i = 0; i < numCompanies; i++) {
    const name = faker.company.name();
    const email = faker.internet.email();
    const admin = mongoose.Types.ObjectId(); // Generate a random ObjectId for the admin
    const bartenders = Array.from({ length: 5 }, () => mongoose.Types.ObjectId()); // Generate random ObjectIds for bartenders

    const company = new BartendingCompany({
      name,
      email,
      admin,
      bartenders,
    });

    await company.save();
    console.log(`Created company: ${name}`);
  }

  await mongoose.disconnect();
}

createCompanies(10); // Adjust the number of companies to generate as needed
