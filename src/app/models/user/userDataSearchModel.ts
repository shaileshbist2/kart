export class FilterObject {
  public country: Object = new CountryObject();
  public state: Object = new StateObject();
  public domain: Object = new DomainObject();
  public industry: Object = new IndustryObject();
  public department: Object = new DepartmentObject();
}

export class CountryObject {
  public country: String = '';
  public country_name: String = '';
  public data_count: String = '';
  public is_checked: Boolean = false;
}

export class StateObject {
  public state: String = '';
  public state_name: String = '';
  public data_count: String = '';
  public is_checked: Boolean = false;
}

export class DomainObject {
  public domain_name: String = '';
  public data_count: String = '';
  public is_checked: Boolean = false;
}

export class IndustryObject {
  public industry_name: String = '';
  public data_count: String = '';
  public is_checked: Boolean = false;
}

export class DepartmentObject {
  public department_name: String = '';
  public department_count: String = '';
  public is_checked: Boolean = false;
}

/********************************/
export class UserContactModel {
  public people_data_id: string = null;
  public company: string = null;
  public full_name: string = null;
  public designation_info: string = null;
  public state: string = null;
  public country: string = null;
  public domain: string = null;
  public contact_number: string = null;
  public linkedin: string = null;
  public email_id: string = null;
  public company_size: string = null;
  public company_website: string = null;
  public industry: string = null;
  public updated_at: string = null;
  public is_purchased: string = null;
  public is_viewed: string = null;
  public per_lead_credits: string = null;
}
