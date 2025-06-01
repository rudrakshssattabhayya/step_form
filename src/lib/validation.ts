import Joi from 'joi';

// Base schema for URI validation
const uriSchema = Joi.string().uri();

// Schema for personal details
export const personalDetailsSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters'
  }),
  email: Joi.string().required().email({ tlds: { allow: false } }).messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  mobile: Joi.string().required().pattern(/^\+?[\d\s-]{10,}$/).messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Please enter a valid phone number'
  }),
  linkedin: uriSchema.optional().allow('').messages({
    'string.uri': 'Please enter a valid LinkedIn URL'
  }),
  github: uriSchema.optional().allow('').messages({
    'string.uri': 'Please enter a valid GitHub URL'
  }),
  address: Joi.string().required().min(5).max(200).messages({
    'string.empty': 'Address is required',
    'string.min': 'Address must be at least 5 characters long',
    'string.max': 'Address cannot exceed 200 characters'
  })
});

// Schema for objective section - updated to only require description
export const objectiveSchema = Joi.object({
  description: Joi.string().required().messages({
    'string.empty': 'Career objective is required'
  }),
  bolds: Joi.object().optional(),
  hyperlinks: Joi.object().optional()
});

// Schema for education entry
export const educationSchema = Joi.array().items(
  Joi.object({
    college: Joi.string().required().min(2).max(100).messages({
      'string.empty': 'College/University name is required',
      'string.min': 'College/University name must be at least 2 characters long',
      'string.max': 'College/University name cannot exceed 100 characters'
    }),
    location: Joi.string().required().min(2).max(100).messages({
      'string.empty': 'Location is required',
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 100 characters'
    }),
    degree: Joi.string().required().min(2).max(100).messages({
      'string.empty': 'Degree is required',
      'string.min': 'Degree must be at least 2 characters long',
      'string.max': 'Degree cannot exceed 100 characters'
    }),
    major: Joi.string().optional().allow(''),
    from: Joi.string().required().isoDate().messages({
      'string.empty': 'Start date is required',
      'string.isoDate': 'Please enter a valid start date'
    }),
    to: Joi.string().required().isoDate().messages({
      'string.empty': 'End date is required',
      'string.isoDate': 'Please enter a valid end date'
    }),
    cgpa: Joi.string().optional().allow('').pattern(/^\d+(\.\d{1,2})?$/),
    description: Joi.array().items(Joi.string()).optional(),
    bolds: Joi.object().optional(),
    hyperlinks: Joi.object().optional()
  })
).min(1).messages({
  'array.min': 'At least one education entry is required'
});

// Schema for work experience entry
export const workExperienceSchema = Joi.array().items(
  Joi.object({
    title: Joi.string().required().min(2).max(100).messages({
      'string.empty': 'Job title is required',
      'string.min': 'Job title must be at least 2 characters long',
      'string.max': 'Job title cannot exceed 100 characters'
    }),
    sub_title: Joi.string().required().min(2).max(100).messages({
      'string.empty': 'Company name is required',
      'string.min': 'Company name must be at least 2 characters long',
      'string.max': 'Company name cannot exceed 100 characters'
    }),
    address: Joi.string().required().min(2).max(200).messages({
      'string.empty': 'Location is required',
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 200 characters'
    }),
    start_date: Joi.string().required().isoDate().messages({
      'string.empty': 'Start date is required',
      'string.isoDate': 'Please enter a valid start date'
    }),
    end_date: Joi.string().required().isoDate().messages({
      'string.empty': 'End date is required',
      'string.isoDate': 'Please enter a valid end date'
    }),
    description: Joi.array().items(Joi.string()).required().min(1).messages({
      'array.min': 'At least one description point is required'
    }),
    bolds: Joi.object().optional(),
    hyperlinks: Joi.object().optional()
  })
).min(1).messages({
  'array.min': 'At least one work experience entry is required'
});

// Schema for skills and certificates
export const skillsAndCertificatesSchema = Joi.object({
  items: Joi.array().items(Joi.string()).required().min(1).messages({
    'array.min': 'At least one skill or certificate is required'
  }),
  bolds: Joi.object().optional(),
  hyperlinks: Joi.object().optional()
});

// Complete resume schema
export const resumeSchema = Joi.object({
  template_name: Joi.string().required(),
  personal_details: personalDetailsSchema.required(),
  objective: objectiveSchema.required(),
  education: educationSchema.required(),
  work_experiences: workExperienceSchema.required(),
  other_experiences: Joi.array().items(workExperienceSchema).optional(),
  skills_and_certificates: skillsAndCertificatesSchema.required()
});