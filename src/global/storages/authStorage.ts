let items_config: any[] = loadItemsConfig();

function loadItemsConfig(): any[] {
  const savedConfig = localStorage.getItem('items_config');
  return savedConfig ? JSON.parse(savedConfig) : [];
}

function saveItemsConfig(newConfig: any[]): void {
  localStorage.setItem('items_config', JSON.stringify(newConfig));
}

export function getItemsConfig(): any[] {
  return items_config;
}

export function setItemsConfig(newConfig: any[]): void {
  items_config = newConfig;
  saveItemsConfig(newConfig);
}