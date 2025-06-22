import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import {getSharedDependencies} from './src/lib/sharedDeps.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default env => {
  const {mode, platform = process.env.PLATFORM} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'hostAppTest',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'hostAppTest',
        dts: false,
        remotes: {
          // miniApp: `miniApp@http://127.0.0.1:9000/${platform}/mf-manifest.json`,
          miniApp: `miniApp@https://github.com/nhattnopm97/home-nail-build/raw/refs/heads/main/generated/${platform}/mf-manifest.json`,
          //   booking: `booking@http://localhost:9000/${platform}/mf-manifest.json`,
        },
        shared: {
          react: {singleton: true, eager: true, requiredVersion: '19.0.0'},
          'react-native': {
            singleton: true,
            eager: true,
            requiredVersion: '0.78.2',
          },
          '@react-native-async-storage/async-storage': {
            singleton: true,
            eager: true,
            requiredVersion: '2.0.0',
          },
          '@react-navigation/native': {
            singleton: true,
            eager: true,
            requiredVersion: '7.0.14',
          },
          '@react-navigation/native-stack': {
            singleton: true,
            eager: true,
            requiredVersion: '7.2.0',
          },
          zustand: {singleton: true, eager: true, requiredVersion: '5.0.5'},
          'react-native-safe-area-context': {
            singleton: true,
            eager: true,
            requiredVersion: '5.3.0',
          },
          'react-native-screens': {
            singleton: true,
            eager: true,
            requiredVersion: '4.10.0',
          },
        },
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
};
