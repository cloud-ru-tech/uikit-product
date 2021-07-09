const { DepGraph } = require('dependency-graph');

function sortFolders(folders) {
  const graph = new DepGraph();

  const foldersByPackageName = {};

  folders.forEach(folder => {
    const packageConfig = require(`${folder}/package.json`);

    const packageName = packageConfig.name;

    foldersByPackageName[packageName] = folder;

    if (!graph.hasNode(packageName)) {
      graph.addNode(packageName);
    }

    if (packageConfig.dependencies) {
      Object.keys(packageConfig.dependencies).forEach(dependency => {
        if (/@sbercloud\/(uikit-|icons).*/.test(dependency)) {
          if (!graph.hasNode(dependency)) {
            graph.addNode(dependency);
          }

          graph.addDependency(packageName, dependency);
        }
      });
    }
  });

  return graph
    .overallOrder()
    .map(packageName => {
      return foldersByPackageName[packageName];
    })
    .filter(Boolean);
}

module.exports = sortFolders;
