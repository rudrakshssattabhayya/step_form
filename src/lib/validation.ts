import Joi from 'joi';

// Base schema for URI validation
const uriSchema = Joi.string().uri();

// Schema for personal details
export const personalDetailsSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().required().email(),
  mobile: Joi.string().required().pattern(/^\+?[\d\s-]{10,}$/),
  linkedin: uriSchema.optional(),
  github: uriSchema.optional(),
  address: Joi.string().required().min(5).max(200)
});

// Schema for objective section
export const objectiveSchema = Joi.object({
  description: Joi.string().required().min(50).max(500),
  bolds: Joi.object().optional(),
  hyperlinks: Joi.object().optional()
});

// Schema for education entry
export const educationEntrySchema = Joi.object({
  college: Joi.string().required().min(2).max(100),
  location: Joi.string().required().min(2).max(100),
  degree: Joi.string().required().min(2).max(100),
  major: Joi.string().optional(),
  from: Joi.string().required().isoDate(),
  to: Joi.string().required().isoDate(),
  cgpa: Joi.string().optional().pattern(/^\d+(\.\d{1,2})?$/),
  description: Joi.array().items(Joi.string()).optional(),
  bolds: Joi.object().optional(),
  hyperlinks: Joi.object().optional()
});

// Schema for work experience entry
export const workExperienceSchema = Joi.object({
  title: Joi.string().required().min(2).max(100),
  sub_title: Joi.string().required().min(2).max(100),
  address: Joi.string().required().min(2).max(200),
  start_date: Joi.string().required().isoDate(),
  end_date: Joi.string().required().isoDate(),
  description: Joi.array().items(Joi.string()).required().min(1),
  bolds: Joi.object().optional(),
  hyperlinks: Joi.object().optional()
});

// Schema for skills and certificates
export const skillsAndCertificatesSchema = Joi.object({
  items: Joi.array().items(Joi.string()).required().min(1),
  bolds: Joi.object().optional(),
  hyperlinks: Joi.object().optional()
});

// Complete resume schema
export const resumeSchema = Joi.object({
  template_name: Joi.string().required(),
  personal_details: personalDetailsSchema.required(),
  objective: objectiveSchema.required(),
  education: Joi.array().items(educationEntrySchema).required().min(1),
  work_experiences: Joi.array().items(workExperienceSchema).required().min(1),
  other_experiences: Joi.array().items(workExperienceSchema).optional(),
  skills_and_certificates: skillsAndCertificatesSchema.required()
});