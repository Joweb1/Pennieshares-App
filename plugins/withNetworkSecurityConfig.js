const { withAndroidManifest, withDangerousMod, AndroidConfig } = require('@expo/config-plugins');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');
const { resolve } = require('path');

const NETWORK_SECURITY_CONFIG_FILE = 'network_security_config.xml';

function withNetworkSecurityConfig(config) {
  config = withAndroidManifest(config, (config) => {
    config.modResults.manifest.application[0].$['android:networkSecurityConfig'] = `@xml/${NETWORK_SECURITY_CONFIG_FILE.replace('.xml', '')}`;
    return config;
  });

  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const androidMainPath = resolve(projectRoot, 'android', 'app', 'src', 'main');
      const resPath = resolve(androidMainPath, 'res');
      const xmlPath = resolve(resPath, 'xml');

      // Ensure the xml directory exists
      mkdirSync(xmlPath, { recursive: true });

      const networkSecurityConfigContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
</network-security-config>`;

      const filePath = resolve(xmlPath, NETWORK_SECURITY_CONFIG_FILE);
      writeFileSync(filePath, networkSecurityConfigContent);

      return config;
    },
  ]);

  return config;
}

module.exports = withNetworkSecurityConfig;