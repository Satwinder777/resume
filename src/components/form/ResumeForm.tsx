import { PersonalInfoForm } from './PersonalInfoForm'
import { SummaryForm } from './SummaryForm'
import { ExperienceForm } from './ExperienceForm'
import { EducationForm } from './EducationForm'
import { SkillsForm } from './SkillsForm'
import { LanguagesForm } from './LanguagesForm'
import { CertificationsForm } from './CertificationsForm'
import { ProjectsForm } from './ProjectsForm'
import { CustomSectionsForm } from './CustomSectionsForm'
import { SectionOrderPanel } from './SectionOrderPanel'

export function ResumeForm() {
  return (
    <div className="space-y-5">
      <PersonalInfoForm />
      <SectionOrderPanel />
      <SummaryForm />
      <ExperienceForm />
      <EducationForm />
      <SkillsForm />
      <LanguagesForm />
      <CertificationsForm />
      <ProjectsForm />
      <CustomSectionsForm />
    </div>
  )
}
