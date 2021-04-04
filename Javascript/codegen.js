const genLocaleKey = (prefix, k) => `${prefix}.${k}`;

const genColumn = (prefix, k, hideInTable) => `{
  title: formatMessage({ id: "${genLocaleKey(k)}" }),
  dataIndex: '${k}',
  hideInTable: ${hideInTable},
},`;

const genLocaleString = (prefix, k, v) => `"${genLocaleKey(prefix, k)}": "${v}",`;

const genType = (k, t, des) => `${k}: ${t};  // ${des}`;

const generateTypes = (properties) =>
  Object.entries(properties)
    .map(([k, { type, description }]) => genType(k, type, description))
    .join("\n");

const generateColumns = (prefix, properties, required = []) =>
  Object.entries(properties)
    .map(([k, { type }]) => genColumn(prefix, k, !required.includes(k)))
    .join("\n");

const generateLocaleStrings = (prefix, properties) =>
  Object.entries(properties)
    .map(([k, { type, description }]) =>
      genLocaleString(prefix, k, description)
    )
    .join("\n");
