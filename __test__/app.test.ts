import request from "supertest";
import app from "../src/app";

describe("Test the lendsqr app", () => {
  const user = {
    first_name: "emeka",
    last_name: "okonkwo",
    email: "emekaokonkwo@gmail.com",
    password: "123456",
  };

  let accountDetail;

  test("Create a valid a user account", async () => {
    const res = await request(app).post("/users/signup").send(user);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("accountDetails");
    accountDetail = res.body.accountDetails;
  });

    test("test identification of duplicate account", async () => {
      const res = await request(app).post("/users/signup").send(user);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("email is already registered with us");
    });

  test("test funding of user account", async () => {
    const res = await request(app).post("/users/deposit").send({
      user_id: "1",
      account_number: accountDetail.account_number,
      amount: 5000,
    });
    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("success");
  });

  test("test withdrawal from user account", async () => {
    const res = await request(app).post("/users/widthdrawal").send({
      user_id: "1",
      account_number: accountDetail.account_number,
      amount: 5000,
    });
    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("success");
  });


  test("test for insufficeient account balance", async () => {
    const res = await request(app).post("/users/widthdrawal").send({
      user_id: "1",
      account_number: accountDetail.account_number,
      amount: 5000,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("insuffient balance");
  });
  
    test("test for transfer to another account", async () => {
      const res = await request(app).post("/users/transfer").send({
        user_id: "1",
        account_number: accountDetail.account_number,
        amount: 5000,
        beneficiary: "0026071016",
      });
      expect(res.status).toEqual(400);
      expect(res.body).toBeTruthy();
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("invalid beneficiary");
    });
});
