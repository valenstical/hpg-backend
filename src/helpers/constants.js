export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNATHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSED: 422,
  SERVER_ERROR: 500,
};

export const MESSAGE = {
  SERVER_ERROR:
    'An internal error has occured. This is not your fault. We are working to fix this problem. Please try again later.',

  NOT_FOUND: 'Resource not found',
  UNATHORIZED_ACCESS: 'You do not have permission to access that resource',
  INVALID_CREDENTIALS: 'Invalid user credentials',

  CREATE_SUCCESS: 'Successfully created',
  UPDATE_SUCCESS: 'Successfully updated',
  VALIDATE_ERROR:
    'There was a problem with your request, please check the values you entered.',

  SUCCESS_MESSAGE: 'Operation was successful',
  FAILURE_MESSAGE: 'Operation failed',
};

export const MEDIA_TYPES = {
  VIDEO: 'video',
  IMAGE: 'image',
  PDF: 'pdf',
  PRESENTATION: 'presentation',
  OTHERS: 'others'
};

export const COUNTRIES = [
  {
    label: 'Nigeria',
    value: 'NGA'
  },
  {
    label: 'Canada',
    value: 'CAN'
  },
  {
    label: 'United States of America',
    value: 'USA'
  },

];

export const LEVELS = ['Assistant Supervisor', 'Supervisor', 'Assistant Manager', 'Unrecognized Manager', 'Recognized Manage', 'Manager', 'Soaring Manager', 'Senior Manager', 'Sapphire Manager', 'Diamond Sapphire Manager', 'Diamond Manager', 'Double Diamond Manager', 'Triple Diamond Manager', 'Diamond Centurion Manager', 'Centurion Manager'];

export const PRICE_TYPES = [
  { id: 1, name: 'Wholesale' },
  { id: 2, name: 'Retail' },
  { id: 3, name: 'Novus' },
  { id: 4, name: 'Assistant Supervisor(5%)' },
  { id: 5, name: 'Supervisor (8%)' },
  { id: 6, name: 'Assistant Manager (13%)' },
  { id: 7, name: 'Manager (18%)', },
];
export default {};
