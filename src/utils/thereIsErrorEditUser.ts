export default function thereIsError(error: any, apiError: string) {
  if (error || apiError) {
    return true;
  }

  return false;
}
