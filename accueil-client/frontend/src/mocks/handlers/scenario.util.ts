const DEFAULT_SCENARIO = 'success';

export function resolveScenario(
  request: Request,
  allowedScenarios: string[] = [DEFAULT_SCENARIO],
  fallback = DEFAULT_SCENARIO
): string {
  const urlScenario = new URL(request.url).searchParams.get('scenario');
  const headerScenario = request.headers.get('x-msw-scenario');
  const candidate = headerScenario ?? urlScenario ?? fallback;

  return allowedScenarios.includes(candidate) ? candidate : fallback;
}
