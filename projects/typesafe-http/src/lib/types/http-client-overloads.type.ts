export type HttpClientOverloads<T> = T extends {
  (...args: infer A01): infer R01;
  (...args: infer A02): infer R02;
  (...args: infer A03): infer R03;
  (...args: infer A04): infer R04;
  (...args: infer A05): infer R05;
  (...args: infer A06): infer R06;
  (...args: infer A07): infer R07;
  (...args: infer A08): infer R08;
  (...args: infer A09): infer R09;
  (...args: infer A10): infer R10;
  (...args: infer A11): infer R11;
  (...args: infer A12): infer R12;
  (...args: infer A13): infer R13;
  (...args: infer A14): infer R14;
  (...args: infer A15): infer R15;
  // Add more if new version of HttpClient introduce more overloads
}
  ?
      | [A01, R01]
      | [A02, R02]
      | [A03, R03]
      | [A04, R04]
      | [A05, R05]
      | [A06, R06]
      | [A07, R07]
      | [A08, R08]
      | [A09, R09]
      | [A10, R10]
      | [A11, R11]
      | [A12, R12]
      | [A13, R13]
      | [A14, R14]
      | [A15, R15]
  : never;
