import entities from "./scripts/entities.mjs";

function entityChooses() {
  return entities.map((entity) => ({
    name: entity,
    value: ` ${entity}`,
  }));
}

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator("feature", {
    description: "Начало начал для новой фичи",
    prompts: [
      {
        type: "input",
        name: "featureName",
        message:
          "имя фичи, желательно на английском, например add expected delivery date to the client order",
      },
      {
        type: "checkbox",
        name: "entity",
        message: "К каким сущносям относится",
        choices: entityChooses,
        default: "common, notSetted",
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: './works/{{kebabCase featureName}}',
        templateFiles: './scripts/templates/work/**/*',
        base: './scripts/templates/work',
        expandDirectories: true
      },
      {
        type: 'append',
        path: './user-stories.adoc',
        pattern: "// APPEND_USER_STORY_AFTER_THAT",
        template: "// FIXME: расширение userStory относительно фичи"
      },
      
      {
        type: 'append',
        path: './data.mmd',
        pattern: "%% add comments after that",
        template: "%% FIXME: расширение схемы данных"
      },
      
      {
        type: 'append',
        path: './openapi.yaml',
        pattern: "# add comments after that",
        template: "# FIXME: расширение http API"
      }
    ]
  });
}
