export class AdminModel {
  email_id: String = null;
  password: String = null;
}

export class Product {
  name: String = null;
  selling_points: SellingPoint[];
}

export class SellingPoint {
  selling_point: string;
}

export class UserModel {
  user_id: String = null;
  first_name: String = null;
  last_name: String = null;
  email_id: String = null;
  password: String = null;
  mobile_number: String = null;
  credits_left: String = null;
  add_credits: Number = 0;
}

export class UserValidateModel {
  start_row: Number = 0;
  end_row: Number = 10;
}
