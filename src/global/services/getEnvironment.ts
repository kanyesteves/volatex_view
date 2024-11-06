function getEnvironment(key: keyof Window['_env_']) {
  return window._env_ && window._env_[key] ? window._env_[key] : undefined;
}

export default getEnvironment;