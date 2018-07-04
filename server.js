const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  winston = require('winston'),
  expressWinston = require('express-winston');

const app = express();

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ name: 'FILE_COMBINED', filename: 'log/combined.log' }),
    new winston.transports.File({ name: 'FILE_ERRORS', filename: 'log/error.log', level: 'error' }),
    new winston.transports.Console({ name: 'CONSOLE_OUTPUT', level: process.env.NODE_ENV === 'production' ? 'error' : 'info' })
  ],
  expressFormat: true,
  colorize: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* API definition */

const api = express.Router();

const data = [
  {
    'id': 291,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 78,
      'account': {
        'id': 21
      },
      'name': 'Argo Kalda',
      'legalPerson': false,
      'active': true,
      'potentialCustomer': false,
      'regNo': null,
      'vatNo': '',
      'businessSector': [],
      'idCode': '36708250286',
      'dateOfBirth': null,
      'manager': {
        'id': 58
      },
      'initialContact': null,
      'initialContactShare': null,
      'notes': 'MK 10%! 1. laek 05.09.2016\n\nLühinimi: Argo Kalda',
      'phoneNo': '',
      'email': '',
      'invoiceEmail': null,
      'vatAmount': null,
      'currency': 'EUR',
      'deadlineDays': 7,
      'invoiceNotes': null,
      'invoiceCountry': '-country-',
      'invoiceTown': '-town-',
      'invoiceZipCode': '-zip-',
      'invoiceStreet': '-street-',
      'invoiceHouseNo': '-house no-',
      'officeCountry': '-country-',
      'officeTown': '-town-',
      'officeZipCode': '-zip-',
      'officeStreet': '-street-',
      'officeHouseNo': '-house no-',
      'sameAddresForOfficeInvoice': false,
      'contractNo': '',
      'contractDate': null,
      'language': 'et',
      'accountingNo': null,
      'fitId': null
    },
    'name': 'Test',
    'code': '0001AK',
    'manager': {
      'id': 58,
      'account': {
        'id': 21
      },
      'name': 'Margus Kõiva',
      'mainInAccount': false,
      'position': {
        'id': 40,
        'account': {
          'id': 21
        },
        'name': 'Vandeadvokaat',
        'description': 'v.adv',
        'permissions': []
      },
      'passwordHash': 'CB2317E97E63EED5890669DB3D3E75C6D9B5C3B4',
      'email': '05181654488@lawtime.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': null
    },
    'businessSector': ['bioscience'],
    'areas': ['bankruptcy'],
    'notes': null,
    'contact': {
      'id': 290,
      'account': {
        'id': 21
      },
      'customer': {
        'id': 78
      },
      'name': 'It Me',
      'phoneNo': '+15551234567',
      'email': 'root@localhost',
      'dateOfBirth': '2018-05-07',
      'position': 'God',
      'comment': null,
      'mainContact': true
    },
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': 100000,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 298,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 170
    },
    'name': 'Test 2',
    'code': '0001AB',
    'manager': {
      'id': 54
    },
    'businessSector': ['healthcare'],
    'areas': ['labor'],
    'notes': null,
    'contact': null,
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': null,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 302,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 78,
      'account': {
        'id': 21
      },
      'name': 'Argo Kalda',
      'legalPerson': false,
      'active': true,
      'potentialCustomer': false,
      'regNo': null,
      'vatNo': '',
      'businessSector': [],
      'idCode': '36708250286',
      'dateOfBirth': null,
      'manager': {
        'id': 58
      },
      'initialContact': null,
      'initialContactShare': null,
      'notes': 'MK 10%! 1. laek 05.09.2016\n\nLühinimi: Argo Kalda',
      'phoneNo': '',
      'email': '',
      'invoiceEmail': null,
      'vatAmount': null,
      'currency': 'EUR',
      'deadlineDays': 7,
      'invoiceNotes': null,
      'invoiceCountry': '-country-',
      'invoiceTown': '-town-',
      'invoiceZipCode': '-zip-',
      'invoiceStreet': '-street-',
      'invoiceHouseNo': '-house no-',
      'officeCountry': '-country-',
      'officeTown': '-town-',
      'officeZipCode': '-zip-',
      'officeStreet': '-street-',
      'officeHouseNo': '-house no-',
      'sameAddresForOfficeInvoice': false,
      'contractNo': '',
      'contractDate': null,
      'language': 'et',
      'accountingNo': null,
      'fitId': null
    },
    'name': 'Test',
    'code': '0001AK',
    'manager': {
      'id': 58,
      'account': {
        'id': 21
      },
      'name': 'Margus Kõiva',
      'mainInAccount': false,
      'position': {
        'id': 40,
        'account': {
          'id': 21
        },
        'name': 'Vandeadvokaat',
        'description': 'v.adv',
        'permissions': []
      },
      'passwordHash': 'CB2317E97E63EED5890669DB3D3E75C6D9B5C3B4',
      'email': '05181654488@lawtime.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': null
    },
    'businessSector': ['bioscience'],
    'areas': ['bankruptcy'],
    'notes': null,
    'contact': {
      'id': 290,
      'account': {
        'id': 21
      },
      'customer': {
        'id': 78
      },
      'name': 'It Me',
      'phoneNo': '+15551234567',
      'email': 'root@localhost',
      'dateOfBirth': '2018-05-07',
      'position': 'God',
      'comment': null,
      'mainContact': true
    },
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': 100000,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 305,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 170
    },
    'name': 'Test 2',
    'code': '0001AB',
    'manager': {
      'id': 54
    },
    'businessSector': ['healthcare'],
    'areas': ['labor'],
    'notes': null,
    'contact': null,
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': null,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 307,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 78,
      'account': {
        'id': 21
      },
      'name': 'Argo Kalda',
      'legalPerson': false,
      'active': true,
      'potentialCustomer': false,
      'regNo': null,
      'vatNo': '',
      'businessSector': [],
      'idCode': '36708250286',
      'dateOfBirth': null,
      'manager': {
        'id': 58
      },
      'initialContact': null,
      'initialContactShare': null,
      'notes': 'MK 10%! 1. laek 05.09.2016\n\nLühinimi: Argo Kalda',
      'phoneNo': '',
      'email': '',
      'invoiceEmail': null,
      'vatAmount': null,
      'currency': 'EUR',
      'deadlineDays': 7,
      'invoiceNotes': null,
      'invoiceCountry': '-country-',
      'invoiceTown': '-town-',
      'invoiceZipCode': '-zip-',
      'invoiceStreet': '-street-',
      'invoiceHouseNo': '-house no-',
      'officeCountry': '-country-',
      'officeTown': '-town-',
      'officeZipCode': '-zip-',
      'officeStreet': '-street-',
      'officeHouseNo': '-house no-',
      'sameAddresForOfficeInvoice': false,
      'contractNo': '',
      'contractDate': null,
      'language': 'et',
      'accountingNo': null,
      'fitId': null
    },
    'name': 'Test',
    'code': '0001AK',
    'manager': {
      'id': 58,
      'account': {
        'id': 21
      },
      'name': 'Margus Kõiva',
      'mainInAccount': false,
      'position': {
        'id': 40,
        'account': {
          'id': 21
        },
        'name': 'Vandeadvokaat',
        'description': 'v.adv',
        'permissions': []
      },
      'passwordHash': 'CB2317E97E63EED5890669DB3D3E75C6D9B5C3B4',
      'email': '05181654488@lawtime.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': null
    },
    'businessSector': ['bioscience'],
    'areas': ['bankruptcy'],
    'notes': null,
    'contact': {
      'id': 290,
      'account': {
        'id': 21
      },
      'customer': {
        'id': 78
      },
      'name': 'It Me',
      'phoneNo': '+15551234567',
      'email': 'root@localhost',
      'dateOfBirth': '2018-05-07',
      'position': 'God',
      'comment': null,
      'mainContact': true
    },
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': 100000,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 309,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 170
    },
    'name': 'Test 2',
    'code': '0001AB',
    'manager': {
      'id': 54
    },
    'businessSector': ['healthcare'],
    'areas': ['labor'],
    'notes': null,
    'contact': null,
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': null,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 310,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 78,
      'account': {
        'id': 21
      },
      'name': 'Argo Kalda',
      'legalPerson': false,
      'active': true,
      'potentialCustomer': false,
      'regNo': null,
      'vatNo': '',
      'businessSector': [],
      'idCode': '36708250286',
      'dateOfBirth': null,
      'manager': {
        'id': 58
      },
      'initialContact': null,
      'initialContactShare': null,
      'notes': 'MK 10%! 1. laek 05.09.2016\n\nLühinimi: Argo Kalda',
      'phoneNo': '',
      'email': '',
      'invoiceEmail': null,
      'vatAmount': null,
      'currency': 'EUR',
      'deadlineDays': 7,
      'invoiceNotes': null,
      'invoiceCountry': '-country-',
      'invoiceTown': '-town-',
      'invoiceZipCode': '-zip-',
      'invoiceStreet': '-street-',
      'invoiceHouseNo': '-house no-',
      'officeCountry': '-country-',
      'officeTown': '-town-',
      'officeZipCode': '-zip-',
      'officeStreet': '-street-',
      'officeHouseNo': '-house no-',
      'sameAddresForOfficeInvoice': false,
      'contractNo': '',
      'contractDate': null,
      'language': 'et',
      'accountingNo': null,
      'fitId': null
    },
    'name': 'Test',
    'code': '0001AK',
    'manager': {
      'id': 58,
      'account': {
        'id': 21
      },
      'name': 'Margus Kõiva',
      'mainInAccount': false,
      'position': {
        'id': 40,
        'account': {
          'id': 21
        },
        'name': 'Vandeadvokaat',
        'description': 'v.adv',
        'permissions': []
      },
      'passwordHash': 'CB2317E97E63EED5890669DB3D3E75C6D9B5C3B4',
      'email': '05181654488@lawtime.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': null
    },
    'businessSector': ['bioscience'],
    'areas': ['bankruptcy'],
    'notes': null,
    'contact': {
      'id': 290,
      'account': {
        'id': 21
      },
      'customer': {
        'id': 78
      },
      'name': 'It Me',
      'phoneNo': '+15551234567',
      'email': 'root@localhost',
      'dateOfBirth': '2018-05-07',
      'position': 'God',
      'comment': null,
      'mainContact': true
    },
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': 100000,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 311,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 170
    },
    'name': 'Test 2',
    'code': '0001AB',
    'manager': {
      'id': 54
    },
    'businessSector': ['healthcare'],
    'areas': ['labor'],
    'notes': null,
    'contact': null,
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': null,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 312,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 78,
      'account': {
        'id': 21
      },
      'name': 'Argo Kalda',
      'legalPerson': false,
      'active': true,
      'potentialCustomer': false,
      'regNo': null,
      'vatNo': '',
      'businessSector': [],
      'idCode': '36708250286',
      'dateOfBirth': null,
      'manager': {
        'id': 58
      },
      'initialContact': null,
      'initialContactShare': null,
      'notes': 'MK 10%! 1. laek 05.09.2016\n\nLühinimi: Argo Kalda',
      'phoneNo': '',
      'email': '',
      'invoiceEmail': null,
      'vatAmount': null,
      'currency': 'EUR',
      'deadlineDays': 7,
      'invoiceNotes': null,
      'invoiceCountry': '-country-',
      'invoiceTown': '-town-',
      'invoiceZipCode': '-zip-',
      'invoiceStreet': '-street-',
      'invoiceHouseNo': '-house no-',
      'officeCountry': '-country-',
      'officeTown': '-town-',
      'officeZipCode': '-zip-',
      'officeStreet': '-street-',
      'officeHouseNo': '-house no-',
      'sameAddresForOfficeInvoice': false,
      'contractNo': '',
      'contractDate': null,
      'language': 'et',
      'accountingNo': null,
      'fitId': null
    },
    'name': 'Test',
    'code': '0001AK',
    'manager': {
      'id': 58,
      'account': {
        'id': 21
      },
      'name': 'Margus Kõiva',
      'mainInAccount': false,
      'position': {
        'id': 40,
        'account': {
          'id': 21
        },
        'name': 'Vandeadvokaat',
        'description': 'v.adv',
        'permissions': []
      },
      'passwordHash': 'CB2317E97E63EED5890669DB3D3E75C6D9B5C3B4',
      'email': '05181654488@lawtime.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': null
    },
    'businessSector': ['bioscience'],
    'areas': ['bankruptcy'],
    'notes': null,
    'contact': {
      'id': 290,
      'account': {
        'id': 21
      },
      'customer': {
        'id': 78
      },
      'name': 'It Me',
      'phoneNo': '+15551234567',
      'email': 'root@localhost',
      'dateOfBirth': '2018-05-07',
      'position': 'God',
      'comment': null,
      'mainContact': true
    },
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': 100000,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 313,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 170
    },
    'name': 'Test 2',
    'code': '0001AB',
    'manager': {
      'id': 54
    },
    'businessSector': ['healthcare'],
    'areas': ['labor'],
    'notes': null,
    'contact': null,
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': null,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 314,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 78,
      'account': {
        'id': 21
      },
      'name': 'Argo Kalda',
      'legalPerson': false,
      'active': true,
      'potentialCustomer': false,
      'regNo': null,
      'vatNo': '',
      'businessSector': [],
      'idCode': '36708250286',
      'dateOfBirth': null,
      'manager': {
        'id': 58
      },
      'initialContact': null,
      'initialContactShare': null,
      'notes': 'MK 10%! 1. laek 05.09.2016\n\nLühinimi: Argo Kalda',
      'phoneNo': '',
      'email': '',
      'invoiceEmail': null,
      'vatAmount': null,
      'currency': 'EUR',
      'deadlineDays': 7,
      'invoiceNotes': null,
      'invoiceCountry': '-country-',
      'invoiceTown': '-town-',
      'invoiceZipCode': '-zip-',
      'invoiceStreet': '-street-',
      'invoiceHouseNo': '-house no-',
      'officeCountry': '-country-',
      'officeTown': '-town-',
      'officeZipCode': '-zip-',
      'officeStreet': '-street-',
      'officeHouseNo': '-house no-',
      'sameAddresForOfficeInvoice': false,
      'contractNo': '',
      'contractDate': null,
      'language': 'et',
      'accountingNo': null,
      'fitId': null
    },
    'name': 'Test',
    'code': '0001AK',
    'manager': {
      'id': 58,
      'account': {
        'id': 21
      },
      'name': 'Margus Kõiva',
      'mainInAccount': false,
      'position': {
        'id': 40,
        'account': {
          'id': 21
        },
        'name': 'Vandeadvokaat',
        'description': 'v.adv',
        'permissions': []
      },
      'passwordHash': 'CB2317E97E63EED5890669DB3D3E75C6D9B5C3B4',
      'email': '05181654488@lawtime.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': null
    },
    'businessSector': ['bioscience'],
    'areas': ['bankruptcy'],
    'notes': null,
    'contact': {
      'id': 290,
      'account': {
        'id': 21
      },
      'customer': {
        'id': 78
      },
      'name': 'It Me',
      'phoneNo': '+15551234567',
      'email': 'root@localhost',
      'dateOfBirth': '2018-05-07',
      'position': 'God',
      'comment': null,
      'mainContact': true
    },
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': 100000,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 315,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 170
    },
    'name': 'Test 2',
    'code': '0001AB',
    'manager': {
      'id': 54
    },
    'businessSector': ['healthcare'],
    'areas': ['labor'],
    'notes': null,
    'contact': null,
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': null,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 316,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 78,
      'account': {
        'id': 21
      },
      'name': 'Argo Kalda',
      'legalPerson': false,
      'active': true,
      'potentialCustomer': false,
      'regNo': null,
      'vatNo': '',
      'businessSector': [],
      'idCode': '36708250286',
      'dateOfBirth': null,
      'manager': {
        'id': 58
      },
      'initialContact': null,
      'initialContactShare': null,
      'notes': 'MK 10%! 1. laek 05.09.2016\n\nLühinimi: Argo Kalda',
      'phoneNo': '',
      'email': '',
      'invoiceEmail': null,
      'vatAmount': null,
      'currency': 'EUR',
      'deadlineDays': 7,
      'invoiceNotes': null,
      'invoiceCountry': '-country-',
      'invoiceTown': '-town-',
      'invoiceZipCode': '-zip-',
      'invoiceStreet': '-street-',
      'invoiceHouseNo': '-house no-',
      'officeCountry': '-country-',
      'officeTown': '-town-',
      'officeZipCode': '-zip-',
      'officeStreet': '-street-',
      'officeHouseNo': '-house no-',
      'sameAddresForOfficeInvoice': false,
      'contractNo': '',
      'contractDate': null,
      'language': 'et',
      'accountingNo': null,
      'fitId': null
    },
    'name': 'Test',
    'code': '0001AK',
    'manager': {
      'id': 58,
      'account': {
        'id': 21
      },
      'name': 'Margus Kõiva',
      'mainInAccount': false,
      'position': {
        'id': 40,
        'account': {
          'id': 21
        },
        'name': 'Vandeadvokaat',
        'description': 'v.adv',
        'permissions': []
      },
      'passwordHash': 'CB2317E97E63EED5890669DB3D3E75C6D9B5C3B4',
      'email': '05181654488@lawtime.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': null
    },
    'businessSector': ['bioscience'],
    'areas': ['bankruptcy'],
    'notes': null,
    'contact': {
      'id': 290,
      'account': {
        'id': 21
      },
      'customer': {
        'id': 78
      },
      'name': 'It Me',
      'phoneNo': '+15551234567',
      'email': 'root@localhost',
      'dateOfBirth': '2018-05-07',
      'position': 'God',
      'comment': null,
      'mainContact': true
    },
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': 100000,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  },
  {
    'id': 317,
    'account': {
      'id': 21
    },
    'customer': {
      'id': 170
    },
    'name': 'Test 2',
    'code': '0001AB',
    'manager': {
      'id': 54
    },
    'businessSector': ['healthcare'],
    'areas': ['labor'],
    'notes': null,
    'contact': null,
    'counterpartyRegNo': null,
    'counterpartyName': null,
    'active': true,
    'budget': null,
    'budgetThreshold': null,
    'fixedPrice': null,
    'startDate': null,
    'endDate': null,
    'contractNo': null,
    'contractDate': null,
    'teamMembers': [{
      'id': 49,
      'account': {
        'id': 21
      },
      'name': 'lawtime+legalia@bind.ee',
      'mainInAccount': true,
      'position': {
        'id': 48,
        'account': {
          'id': 21
        },
        'name': 'admin',
        'description': null,
        'permissions': ['ACTIVITY_OWN__QUEUE_FOR_BILLING', 'ACTIVITY_ANY__COMMENT__READ_UPDATE', 'INVOICE__READ', 'CASE_IN_TEAM__FIXPRICE__UPDATE', 'ACCOUNT__UPDATE', 'PRICE__READ', 'CASE_FEE_PERSONAL__SUM__READ', 'CASE_ANY__FIXPRICE__READ_UPDATE', 'INVOICE__CREATE_UPDATE', 'PRICE__CREATE_UPDATE_DELETE', 'CASE_ANY__CREATE', 'ACTIVITY_ANY__READ_DELETE', 'ACTIVITY_OF_MANAGED_CUSTOMER__READ_DELETE', 'CUSTOMER__UPDATE', 'INVOICE__CONFIRM', 'ACTIVITY_OF_MANAGED_CUSTOMER__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__FIXPRICE__READ', 'ACTIVITY_ANY__UPDATE', 'CASE_ANY__UPDATE', 'ACTIVITY_ANY__QUEUE_FOR_BILLING', 'CASE_IN_TEAM__BUDGET__READ', 'INVOICE__DELETE', 'SEQUENCE__CREATE_UPDATE', 'CASE_FEE_ANY__CREATE_UPDATE', 'CASE_IN_TEAM__BUDGET__UPDATE', 'POSITION__PERMISSIONS__READ_UPDATE', 'CASE_FEE_ANY__READ_DELETE', 'CUSTOMER__CREATE', 'ACTIVITY_OF_MANAGED_AFFAIR__QUEUE_FOR_BILLING', 'INVOICE__UNCONFIRM', 'ACTIVITY_OF_MANAGED_AFFAIR__READ_DELETE', 'EMPLOYEE__CREATE_UPDATE_DELETE', 'CASE_ANY__BUDGET__READ_UPDATE', 'ACTIVITY_TYPE__CREATE_UPDATE_DELETE']
      },
      'passwordHash': '3073F1A4C3E940C477EFB8822614AC36361C91C5',
      'email': 'lawtime+legalia@bind.ee',
      'active': true,
      'loginDisabled': false,
      'defaultView': 'EmployeesList'
    }],
    'fitId': null
  }
];

api.get('/search', (req, res) => {
  const out = [];
  if (req.query.entity === 'Affair') {
    out.push(...data.map(d => [req.query.entity, d.id]));
  }
  setTimeout(() => res.send(out), 150); // Simulate delay
});

api.get('/data', (req, res) => {
  const ids = req.query.ids;
  const out = data.filter(d => ids.includes(d.id));
  setTimeout(() => res.send(out), 150); // Simulate delay
});

/* End API */

app.use('/api', api);

app.use(express.static(path.join(__dirname, '/dist/')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`Server listening on http://localhost:${port} in ${process.env.NODE_ENV} mode`);
});
