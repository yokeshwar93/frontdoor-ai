
export const API_ROUTES = {
  login: '/auth/login',
  signup: '/users/create',
  getSummariesForUser: '/summary/getSummaryForUser',
  saveSummary: '/summary/saveSummary'
}
export const REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const SORT_OPTIONS = [
  {
    label: 'Date',
    value: 'date'
  },
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Text',
    value: 'text'
  },
  {
    label: 'Summary',
    value: 'summary'
  }
]
export const FILTER_OPTIONS = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Text',
    value: 'text'
  },
  {
    label: 'Summary',
    value: 'summary'
  }
]
export const API_SERVER = 'http://localhost:8080'
