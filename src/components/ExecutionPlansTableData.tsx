// Data generator and filter logic for Execution Plans table

export interface TableRowData {
  plan: string;
  activity: string;
  fundingSource: string;
  appnYear: string;
  purpose: string;
  needDates: string;
  funding: string;
  status: string;
  statusColor: string;
  statusBg: string;
  health: string;
  healthColor: string;
  healthBg: string;
}

const activities = [
  'NSWC PCD', 'NSWC PHD', 'Northrop Grumm...', 'Bollinger', 'PMS 420', 
  'PMS 495', 'PMS 501', 'Raytheon', 'DLA', 'NAVWAR', 'BAE Systems', 
  'Lockheed Martin', 'General Dynamics', 'L3Harris', 'PMS 450', 'PMS 505'
];

const fundingSources = [
  '1B1B/C011B1-SO', '1B1B/C011B1-SX', '1C1C/C01C9-00', '1D4D/C01C9-IL',
  '0605513N/3067', '0605512N/3428', '0605513N/2550', '0605513N/4101',
  'BLI 4221/SB00075', 'BLI 4221/SB0001', 'BLI 9020/JC1LM', 'BLI 1319/PE0603513N',
  'BLI 1506/OPN00045', 'BLI 1810/PROC0021', 'BLI 2040/OMN11032'
];

const appnYears = ['AY25', 'AY26'];

const purposes = [
  'Contract Awarded', 'Avoid Stop Work', 'FY27 Q3 Delivery', 'Update Computer',
  'Increase Efficiency', 'Stock up supplies', 'Construct Building', 'Remove constraint',
  'Security Updates', 'Required Training', 'System Modernization', 'Hardware Refresh',
  'Software Upgrade', 'Infrastructure Support', 'Capability Enhancement'
];

const needDatePairs = [
  'RE: 1 Jan 2025\nDC: 6 Aug 2025',
  'RE: 1 Feb 2025\nDC: 1 Sep 2026',
  'RE: 1 Dec 2025\nDC: 1 Jun 2026',
  'RE: 15 Mar 2025\nDC: 20 Oct 2025',
  'RE: 1 Apr 2025\nDC: 15 Dec 2025',
  'RE: 1 May 2025\nDC: 30 Nov 2025'
];

const planTitles = [
  'MVCS Tech Refresh Procurement',
  'Production Engineering - Surface Package',
  'STC-R2 Procurement',
  'Mission Module Display',
  'Mission Package Support',
  'Ship Operations',
  'Small Unmanned Surface Vehicle',
  'sUSV Procurement',
  'Cyber Security',
  'Professional Support Services',
  'Combat Systems Integration',
  'Radar Modernization',
  'Sonar System Upgrade',
  'Navigation Equipment',
  'Communications Infrastructure',
  'Weapons System Enhancement',
  'Fire Control Systems',
  'Electronic Warfare Suite',
  'Command and Control Systems',
  'Propulsion System Overhaul'
];

const fundingAmounts = [
  '$1,000,000', '$1,300,000', '$2,200,000', '$3,000,000', '$4,000,000',
  '$5,000,000', '$6,500,000', '$6,800,000', '$7,250,000', '$8,750,000',
  '$2,500,000', '$3,750,000', '$4,500,000', '$5,500,000', '$7,000,000'
];

const statusConfigs = {
  'Activity Distribution': {
    color: '#147db9',
    bg: 'rgba(20, 125, 185, 0.09)',
  },
  'APM Acceptance': {
    color: '#147db9',
    bg: 'rgba(20, 125, 185, 0.09)',
  },
  'BFM Processing': {
    color: '#147db9',
    bg: 'rgba(20, 125, 185, 0.09)',
  },
  'Preparing for Execution': {
    color: '#147db9',
    bg: 'rgba(20, 125, 185, 0.09)',
  },
  'Ready for Execution': {
    color: '#147db9',
    bg: 'rgba(20, 125, 185, 0.09)',
  },
  'Completed': {
    color: '#00749e',
    bg: 'rgba(0, 179, 238, 0.12)',
  },
};

const healthConfigs = {
  'At Risk': {
    color: '#ab6400',
    bg: 'rgba(255, 222, 0, 0.24)',
  },
  'Past': {
    color: 'rgba(196, 0, 6, 0.83)',
    bg: 'rgba(243, 0, 13, 0.08)',
  },
  'On Track': {
    color: '#218358',
    bg: 'rgba(0, 164, 51, 0.1)',
  },
  'Completed': {
    color: '#00749e',
    bg: 'rgba(0, 179, 238, 0.12)',
  },
};

function generateRow(
  incNumber: number,
  status: string,
  health: string
): TableRowData {
  const randIndex = (arr: any[]) => Math.floor(Math.random() * arr.length);
  
  const statusConfig = statusConfigs[status as keyof typeof statusConfigs];
  const healthConfig = healthConfigs[health as keyof typeof healthConfigs];

  return {
    plan: `INC-${String(incNumber).padStart(3, '0')} • ${planTitles[randIndex(planTitles)]}`,
    activity: activities[randIndex(activities)],
    fundingSource: fundingSources[randIndex(fundingSources)],
    appnYear: appnYears[randIndex(appnYears)],
    purpose: purposes[randIndex(purposes)],
    needDates: needDatePairs[randIndex(needDatePairs)],
    funding: fundingAmounts[randIndex(fundingAmounts)],
    status,
    statusColor: statusConfig.color,
    statusBg: statusConfig.bg,
    health,
    healthColor: healthConfig.color,
    healthBg: healthConfig.bg,
  };
}

export function getFilteredData(filter: string): TableRowData[] {
  const baseData: TableRowData[] = [
    {
      plan: 'INC-014 • MVCS Tech Refresh Procurement',
      activity: 'NSWC PCD',
      fundingSource: '1B1B/C011B1-SO',
      appnYear: 'AY25',
      purpose: 'Contract Awarded',
      needDates: 'RE: 1 Jan 2025\nDC: 6 Aug 2025',
      funding: '$5,000,000',
      status: 'Activity Distribution',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'At Risk',
      healthColor: '#ab6400',
      healthBg: 'rgba(255, 222, 0, 0.24)',
    },
    {
      plan: 'INC-022 • Production Engineering - Surface Package',
      activity: 'NSWC PHD',
      fundingSource: '1C1C/C01C9-00',
      appnYear: 'AY26',
      purpose: 'Avoid Stop Work',
      needDates: 'RE: 1 Feb 2025\nDC: 1 Sep 2026',
      funding: '$4,000,000',
      status: 'APM Acceptance',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'On Track',
      healthColor: '#218358',
      healthBg: 'rgba(0, 164, 51, 0.1)',
    },
    {
      plan: 'INC-031 • STC-R2 Procurement',
      activity: 'Northrop Grumm...',
      fundingSource: '1D4D/C01C9-IL',
      appnYear: 'AY26',
      purpose: 'FY27 Q3 Delivery',
      needDates: 'RE: 1 Dec 2025\nDC: 1 Jun 2026',
      funding: '$3,000,000',
      status: 'BFM Processing',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'Past',
      healthColor: 'rgba(196, 0, 6, 0.83)',
      healthBg: 'rgba(243, 0, 13, 0.08)',
    },
    {
      plan: 'INC-064 •Mission Module Display',
      activity: 'Bollinger',
      fundingSource: '0605513N/3067',
      appnYear: 'AY25',
      purpose: 'Update Computer',
      needDates: 'RE: 1 Jan 2025\nDC: 6 Aug 2025',
      funding: '$6,500,000',
      status: 'Preparing for Execution',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'At Risk',
      healthColor: '#ab6400',
      healthBg: 'rgba(255, 222, 0, 0.24)',
    },
    {
      plan: 'INC-071 • Mission Package Support',
      activity: 'PMS 420',
      fundingSource: '0605512N/3428',
      appnYear: 'AY26',
      purpose: 'Increase Efficiency',
      needDates: 'RE: 1 Feb 2025\\nDC: 1 Sep 2026',
      funding: '$7,250,000',
      status: 'Ready for Execution',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'On Track',
      healthColor: '#218358',
      healthBg: 'rgba(0, 164, 51, 0.1)',
    },
    {
      plan: 'INC-072 • Ship Operations',
      activity: 'PMS 495',
      fundingSource: 'BLI 4221/SB00075',
      appnYear: 'AY26',
      purpose: 'Stock up supplies',
      needDates: 'RE: 1 Dec 2025\nDC: 1 Jun 2026',
      funding: '$1,300,000',
      status: 'Completed',
      statusColor: '#00749e',
      statusBg: 'rgba(0, 179, 238, 0.12)',
      health: 'Completed',
      healthColor: '#00749e',
      healthBg: 'rgba(0, 179, 238, 0.12)',
    },
    {
      plan: 'INC-089 • Small Unmanned Surface Vehicle',
      activity: 'PMS 501',
      fundingSource: 'BL4221/SB001',
      appnYear: 'AY25',
      purpose: 'Construct Building',
      needDates: 'RE: 1 Jan 2025\nDC: 6 Aug 2025',
      funding: '$8,750,000',
      status: 'APM Acceptance',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'At Risk',
      healthColor: '#ab6400',
      healthBg: 'rgba(255, 222, 0, 0.24)',
    },
    {
      plan: 'INC-100 • sUSV Procurement',
      activity: 'Raytheon',
      fundingSource: 'BLI 9020/JC1LM',
      appnYear: 'AY26',
      purpose: 'Remove constraint',
      needDates: 'RE: 1 Feb 2025\nDC: 1 Sep 2026',
      funding: '$2,200,000',
      status: 'BFM Processing',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'On Track',
      healthColor: '#218358',
      healthBg: 'rgba(0, 164, 51, 0.1)',
    },
    {
      plan: 'INC-125 • Cyber Security',
      activity: 'DLA',
      fundingSource: '0605513N/2550',
      appnYear: 'AY26',
      purpose: 'Security Updates',
      needDates: 'RE: 1 Dec 2025\nDC: 1 Jun 2026',
      funding: '$6,800,000',
      status: 'Preparing for Execution',
      statusColor: '#147db9',
      statusBg: 'rgba(20, 125, 185, 0.09)',
      health: 'Past',
      healthColor: 'rgba(196, 0, 6, 0.83)',
      healthBg: 'rgba(243, 0, 13, 0.08)',
    },
    {
      plan: 'INC-138 • Professional Support Services',
      activity: 'NAVWAR',
      fundingSource: '1B1B/C011B1-SX',
      appnYear: 'AY25',
      purpose: 'Required Training',
      needDates: 'RE: 1 Jan 2025\nDC: 6 Aug 2025',
      funding: '$1,000,000',
      status: 'Completed',
      statusColor: '#00749e',
      statusBg: 'rgba(0, 179, 238, 0.12)',
      health: 'Completed',
      healthColor: '#00749e',
      healthBg: 'rgba(0, 179, 238, 0.12)',
    },
  ];

  // All In Progress: return mixed dataset (base data)
  if (filter === 'All In Progress') {
    return baseData;
  }

  // Status-based filters
  if (['Activity Distribution', 'APM Acceptance', 'BFM Processing', 'Preparing for Execution', 'Ready for Execution'].includes(filter)) {
    const statusFilter = filter === 'Preparing for Execution' ? 'Preparing for Execution' : filter;
    let filtered = baseData.filter(row => row.status === statusFilter || row.status === statusFilter + '...');
    
    // Generate additional rows to reach 10
    let incCounter = 200;
    while (filtered.length < 10) {
      // Mix health states for filtered status
      const healthStates = ['At Risk', 'Past', 'On Track'];
      const health = healthStates[filtered.length % healthStates.length];
      filtered.push(generateRow(incCounter++, statusFilter, health));
    }
    
    return filtered.slice(0, 10);
  }

  // Health-based filters
  if (['At Risk', 'Past', 'Completed'].includes(filter)) {
    let filtered = baseData.filter(row => row.health === filter);
    
    // Generate additional rows to reach 10
    let incCounter = 300;
    while (filtered.length < 10) {
      // Mix status states for filtered health
      const statusStates = ['Activity Distribution', 'APM Acceptance', 'BFM Processing', 'Preparing for Execution', 'Ready for Execution'];
      // For Completed health, use Completed status
      const status = filter === 'Completed' ? 'Completed' : statusStates[filtered.length % statusStates.length];
      filtered.push(generateRow(incCounter++, status, filter));
    }
    
    return filtered.slice(0, 10);
  }

  return baseData;
}