import { http, HttpResponse } from 'msw';

export interface ITestData {
  id: number;
  content: string;
}
const testData: ITestData[] = [];

export const handlers = [
  http.get('/test', () => HttpResponse.json(testData)),
  http.post('/test', async ({ request }) => {
    const req = await request.json();
    testData.push(req as ITestData);
    console.log(testData);
    return HttpResponse.json(testData);
  }),
];
