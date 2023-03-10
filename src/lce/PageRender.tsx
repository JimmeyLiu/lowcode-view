import React, { useState } from 'react';
import { Spin } from 'antd';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'
import assets from './assets.json'

const PageRender = (props) => {
    const [data, setData] = useState({});

    async function init() {
        const packages = assets.packages;
        // const projectSchema = getProjectSchemaFromLocalStorage(scenarioName);
        const { componentsMap: componentsMapArray, componentsTree } = props.schema;
        const componentsMap: any = {};
        componentsMapArray.forEach((component: any) => {
            componentsMap[component.componentName] = component;
        });
        const schema = componentsTree[0];

        const libraryMap = {};
        const libraryAsset: Array<any> = [];
        packages.forEach(({ package: _package, library, urls, renderUrls }) => {
            libraryMap[_package] = library;
            if (renderUrls) {
                libraryAsset.push(renderUrls);
            } else if (urls) {
                libraryAsset.push(urls);
            }
        });

        const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

        // TODO asset may cause pollution
        const assetLoader = new AssetLoader();
        await assetLoader.load(libraryAsset);
        const components = await injectComponents(buildComponents(libraryMap, componentsMap));

        setData({
            schema,
            components,
        });
    }

    const { schema, components } = data;
    if (!schema || !components) {
        init();
        return <Spin size='large' />;
    }

    return (
        <div className="lowcode-plugin-sample-preview">
            <ReactRenderer
                className="lowcode-plugin-sample-preview-content"
                schema={schema}
                components={components}
                appHelper={{
                    requestHandlersMap: {
                        fetch: createFetchHandler()
                    }
                }}
            />
        </div>
    );
};

export default PageRender
