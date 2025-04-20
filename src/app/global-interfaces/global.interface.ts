export interface ApiError {
  error_code: number;
  error_message: string;
  error_field?: string[];
}

export interface ApiResponse<T> {
  error?: ApiError;
  success: boolean;
  value?: T;
}

export interface CommunicationResultResponse {
  status: string;
  message: string;
}


export class OperationCode {
  static PING: string = '0';
  static ERROR: string = '1';
  static GET_PAM_DEVICE_INFO: string = 'E';
  static GET_PAM_DEVICE_STREAMING_CONFIG: string = 'r';
  static SET_PAM_DEVICE_STREAMING_CONFIG: string = 'R';
  static GET_PAM_DEVICE_LOGGING_CONFIG: string = 'l';
  static SET_PAM_DEVICE_LOGGING_CONFIG: string = 'L';
  static CHANGE_OP_MODE: string = 'O';
  static SUMMARY_REPORT: string = 'S';
  static SUMMARY_SIMPLE_REPORT: string = 's';
  static SET_REPORTING_PERIODS: string = 'P';
  static GET_REPORTING_PERIODS: string = 'p';

  static getDescription(code: string): string {
    const descriptions: { [key: string]: string } = {
      '0': 'Ping',
      '1': 'Error',
      'E': 'Get Device Info',
      'r': 'Get Streaming Config',
      'R': 'Set Streaming Config',
      'l': 'Get Logging Config',
      'L': 'Set Logging Config',
      'O': 'Change Operation Mode',
      'S': 'Summary Report',
      's': 'Summary Simple Report',
      'P': 'Set Reporting Periods',
      'p': 'Get Reporting Periods'
    };

    return descriptions[code] || 'Unknown Operation';
  }

  static getColor(code: string): string {
    const colors: { [key: string]: string } = {
      '0': 'rgba(70,130,180,1)',  // Steel Blue
      '1': 'rgba(220,20,60,1)',  // Crimson
      'E': 'rgba(255,140,0,1)',  // Dark Orange
      'r': 'rgba(138,43,226,1)',  // Blue Violet
      'R': 'rgba(147,112,219,1)',  // Medium Purple
      'l': 'rgba(255,99,71,1)',  // Tomato
      'L': 'rgba(255,69,0,1)',  // Orange Red
      'O': 'rgba(46,139,87,1)',  // Sea Green
      'S': 'rgba(65,105,225,1)',  // Royal Blue
      's': 'rgba(100,149,237,1)',  // Cornflower Blue
      'P': 'rgba(218,165,32,1)',  // Goldenrod
      'p': 'rgba(184,134,11,1)'   // Dark Goldenrod
    };


    return colors[code] || '#D3D3D3';  // Light Gray as default color
  }
}
