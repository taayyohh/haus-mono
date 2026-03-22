'use client';

import React from 'react';

let RelayEnvironmentProvider: any = null;
let createRelayEnvironment: any = null;

if (typeof window !== 'undefined') {
  const reactRelay = require('react-relay');
  const relayEnv = require('@/lib/relay/environment');

  RelayEnvironmentProvider = reactRelay.RelayEnvironmentProvider;
  createRelayEnvironment = relayEnv.createRelayEnvironment;
}

export function RelayProvider({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  if (!RelayEnvironmentProvider || !createRelayEnvironment) {
    return <>{children}</>;
  }

  const environment = createRelayEnvironment();
  if (!environment) {
    return <>{children}</>;
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
