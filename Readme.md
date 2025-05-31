The next things the form should have just follow it and add it the form

well in the backend this is the req body I am expecting

```const compile_latex_params = () => {
const bold_schema = joi.object();
const hyperlink_schema = joi.object();
const description_schema = joi.array().items(joi.string());

const personal_details_schema = joi.object({
name: joi.string().required(),
email: joi.string().email().required(),
mobile: joi.string().required(),
linkedin: joi.string().uri().optional(),
github: joi.string().uri().optional(),
address: joi.string().required()
});

const objective_schema = joi.object({
description: joi.string().required(),
bolds: bold_schema.optional(),
hyperlinks: hyperlink_schema.optional()
});

const education_item_schema = joi.object({
college: joi.string().required(),
location: joi.string().required(),
degree: joi.string().required(),
major: joi.string().optional(),
from: joi.string().required(),
to: joi.string().required(),
cgpa: joi.string().optional(),
description: description_schema.optional(),
bolds: bold_schema.optional(),
hyperlinks: hyperlink_schema.optional(),
});

const experience_item_schema = joi.object({
title: joi.string().required(),
sub_title: joi.string().required(),
address: joi.string().required(),
start_date: joi.string().required(),
end_date: joi.string().required(),
description: description_schema.required(),
bolds: bold_schema.optional(),
hyperlinks: hyperlink_schema.optional(),
});

const skills_and_certificates_item_schema = joi.object({
items: description_schema.required(),
bolds: bold_schema.optional(),
hyperlinks: hyperlink_schema.optional(),
});

const schema = joi.object({
template_name: joi.string().empty('').default(DEFAULT_RESUME_TEMPLATE),
personal_details: personal_details_schema.required(),
objective: objective_schema.optional(),
education: joi.array().items(education_item_schema).required(),
work_experiences: joi.array().items(experience_item_schema).optional(),
other_experiences: joi.array().items(experience_item_schema).optional(),
skills_and_certificates: skills_and_certificates_item_schema.optional(),
});

return schema;
}```

The old form flow is attached as pdf in the repo as "old_form.pdf", just update the fields according to it (Just refer it to update the fields of the current form, dont copy any styles from old form). what fields are required can be confirmed with the req body. Also try to save all the form data in the localstorage in real time using react states and then in the end when its time to submit the req body should look in the json I shared.

In the "old_form.pdf", I have shown you in order how to next screen would look. Some step is longer so the inner form component should have a side scroll bar (very minimal in style and should be hidden when not scrolled). Some steps like work experience or education should have a extra button to add another education or work ex in the same step so that it can be shared as array of those form values (Just validate everything I want from the pdf and the backend req body)

In some steps I have description component also which should by default have 1 point but when need should have option to add another point with the button as shown inside pdf. just use the inline CSS like tailwind and keep it responsive