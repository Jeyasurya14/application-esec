import { Injectable, Type } from "@angular/core";
import { dashboardManifest } from "../../modules/dashboard/dashboard.manifest";
import { licenseManifest } from "../../modules/license/license.manifest";
import { cloudManifest } from "../../modules/cloud/cloud.manifest";
import { Module } from "../models/module.model";
import { Screen } from "../models/screen.model";
import { ReportManifest } from "../../modules/report/report.manifest";
import { assetManifest } from "../../modules/asset/asset.manifest";
import { complianceManifest } from "../../modules/compliance/compliance.manifest";
import { hpcManifest } from "../../modules/hpc/hpc.manifest";
import { ProcessManifest } from "../../modules/process/process.manifest";
import { multiSiteManifest } from "../../modules/multi-site/multi-site.manifest";
import { softwareManifest } from "../../modules/software/software.manifest";
import { softwareRegisterManifest } from "../../modules/software-register/software-register.manifest";
import { customLicenseManifest } from "../../modules/custom-license/custom-license.manifest";
import { adminManifest } from "../../modules/admin/admin.manifest";


@Injectable({
    providedIn:'root'
})

export class ModuleRegistry{
    private readonly manifests = [
        dashboardManifest,
        licenseManifest,
        cloudManifest,
        ReportManifest,
        assetManifest,
        complianceManifest,
        hpcManifest,
        ProcessManifest,
        multiSiteManifest,
        softwareManifest,
        softwareRegisterManifest,
        customLicenseManifest,
        adminManifest
    ]

    getModules(): readonly Module[]{
        return this.manifests.map(manifest => manifest.module)
    }

    getModule(id:string): Module | undefined{
        return this.getModules().find(manifest => manifest.id === id)
    }

    getScreens(moduleId:string): readonly Screen[]{
        const manifest = this.manifests.find(
            manifest => manifest.module.id === moduleId
        )
        return manifest?.screens ?? [];
    }

    getScreen(screenId:string): Screen | undefined{
        return this.manifests.flatMap(manifest => manifest.screens).find(screen => screen.id === screenId)
    }

    getComponent(screenId:string):Type<unknown> | null{
        const screen = this.manifests.flatMap(manifest => manifest.screens).find(screen => screen.id === screenId);
        return screen?.component ?? null;
    }
}