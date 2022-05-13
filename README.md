# Files Microservice

This is file management microservice from Pip.Services library. 
It keeps lists of files that can be stored in blob storage or linked to external source using uri.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process
* External APIs: HTTP/REST
* Persistence: Memory, Flat Files, MongoDB, AWS S3

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-files-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class FileV1 {
    /* Identification */
    public id: string;
    public group: string;
    public name: string;

    /* Content */
    public description: string;
    public content_id: string;
    public content_uri: string;
    public thumbnail_id: string;
    public thumbnail_uri: string;
    public create_time: Date;
    public expire_time: Date;
    public attributes: StringValueMap;

    /* Custom fields */
    public custom_hdr: any;
    public custom_dat: any;
}

interface IFileV1 {
    getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>>;
    getFilesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FileV1>>;
    getFilesByIds(correlationId: string, fileIds: string[]): Promise<FileV1[]>;
    getFileById(correlationId: string, fileId: string): Promise<FileV1>;
    createFile(correlationId: string, file: FileV1): Promise<FileV1>;
    updateFile(correlationId: string, file: FileV1): Promise<FileV1>;
    deleteFileById(correlationId: string, fileId: string): Promise<FileV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-files-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
{    
---
- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-files:persistence:file:default:1.0"
  path: "./data/files.json"

- descriptor: "service-files:controller:default:default:1.0"

- descriptor: "service-files:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
}
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-files-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-files-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.FilesHttpClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Create a new picture
let file = {
    group: "pictures",
    name: "google_search.jpg",
    content_uri: "http://somewhere.com/google_search.jpg"
};

let file = await client.createFile(
    null,
    file
);
```

```javascript
// Read files
let page = await client.beginFileRead(
    null,
    { group: 'pictures' },
    null
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

