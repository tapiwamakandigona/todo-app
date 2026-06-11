# Changelog

## [2.0.0] - 2026-06-11

### Added
- **TapDo branding**: new name, custom gradient app icon, splash screens, favicon and PWA icons (192/512, maskable)
- **Signed release APK pipeline**: GitHub Actions now builds a zipaligned, apksigner-signed release APK (was: unsigned debug build), runnable on demand via workflow_dispatch or on version tags
- Native Android icons/splash generated in CI via @capacitor/assets
- Web app manifest now complete (description, maskable icons, correct theme colors)

### Changed
- Full UI refresh: indigo/violet design system, gradient header, card-style tasks, segmented filter tabs, polished category pills, safe-area insets for Android
- App title, meta description and favicon in index.html

### Fixed
- Delete button rendered the literal text `\u00d7` instead of the × glyph
- manifest.json referenced icon files that did not exist in the repo

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025

### Added
- Initial release
- Full implementation
- CI/CD pipeline
- Documentation
