import { register, login } from "../auth.controller";

describe("auth controller ", () => {
  describe("register", () => {
    //  test should return error when password is empty;
    test("should return error when password is empty", () => {
      const mockNext = jest.fn();
      expect(mockNext).not.toHaveBeenCalled();

      const mockReq = {
        body: { username: "test", email: "test@gmail.com", password: "" },
      };

      const mockRes = { status: jest.fn(), json: jest.fn() };
      mockRes.status.mockReturnValue(mockRes);
      mockRes.json.mockReturnValue(mockRes);

      register(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith(
        "username, email and password are required"
      );
    });

    //  test should return error when username is empty;
    test("should return error when username is empty", () => {
      const mockNext = jest.fn();
      expect(mockNext).not.toHaveBeenCalled();

      const mockReq = {
        body: { username: "", email: "test@gmail.com", password: "test" },
      };

      const mockRes = { status: jest.fn(), json: jest.fn() };
      mockRes.status.mockReturnValue(mockRes);
      mockRes.json.mockReturnValue(mockRes);

      register(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith(
        "username, email and password are required"
      );
    });

    //  test should return error when email is empty;
    test("should return error when email is empty", () => {
      const mockNext = jest.fn();
      expect(mockNext).not.toHaveBeenCalled();

      const mockReq = {
        body: { username: "test", email: "", password: "test" },
      };

      const mockRes = { status: jest.fn(), json: jest.fn() };
      mockRes.status.mockReturnValue(mockRes);
      mockRes.json.mockReturnValue(mockRes);

      register(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith(
        "username, email and password are required"
      );
    });

    //  test should return User has been registered when all fields are filled;
    test("should return User has been registered when all fields are filled", async () => {
      const mockNext = jest.fn();
      expect(mockNext).not.toHaveBeenCalled();

      const mockReq = {
        body: { username: "test", email: "test@gmail.com", password: "test" },
      };

      const mockRes = { status: jest.fn(), json: jest.fn() };
      mockRes.status.mockReturnValue(mockRes);
      mockRes.json.mockReturnValue(mockRes);

      register(mockReq, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalledWith(200);
      expect(mockRes.json).not.toHaveBeenCalledWith(
        "username, email and password are required"
      );
    });
  });
});

describe("auth controller ", () => {
  describe("login", () => {
    //  test should return error when email || password is empty;
    test("should return error when email or password is empty", async () => {
      const mockNext = jest.fn();
      expect(mockNext).not.toHaveBeenCalled();

      const mockReq = {
        body: { email: "", password: "test" },
      };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      mockRes.status.mockReturnValue(mockRes);
      mockRes.json.mockReturnValue(mockRes);

      login(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith(
        "email and password are required"
      );
    });
  });
});
