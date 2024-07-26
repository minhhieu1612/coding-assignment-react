import { useCallback, useState } from 'react';

export default function useLoading({
  loaderElement,
}: {
  loaderElement: JSX.Element;
}) {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  const Loader = loading ? loaderElement : '';

  return { startLoading, stopLoading, Loader };
}
