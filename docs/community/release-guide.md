---
title: Release Guide
---

# Apache Auron (Incubating) Release Guide

This runbook describes how a Release Manager (RM) prepares, verifies, votes on, and
publishes an Apache Auron (Incubating) source release. It covers the Incubator process:
an Auron community vote on `dev@auron.apache.org`, followed by an Incubator PMC (IPMC)
vote on `general@incubator.apache.org`.

This guide is operational guidance, not policy. If it conflicts with current ASF or
Incubator policy, follow the official policy and update this guide.

::: danger Important release boundary
The source archive, not the Git tag or GitHub release, is the artifact being voted on.
Never replace or modify an artifact after its vote has started. Any byte-level change
requires a new RC and a new vote.
:::

## Release lifecycle

1. Open a release issue and define the release variables.
2. Prepare the source, legal files, version, and release notes.
3. Create an immutable RC tag.
4. Build, sign, and stage the source archive in `dist/dev`.
5. Independently verify the staged release candidate.
6. Run the public Auron community vote.
7. Run the public IPMC vote.
8. Promote the approved artifact to `dist/release`.
9. Wait for the official download service, publish the website and GitHub release, and
   announce the release.
10. Clean up staging artifacts and move the source repository to the next development
    version.

If an RC is cancelled, fix the issue, increment `RC_NUMBER`, and repeat every affected
step. Do not reuse a tag or staging directory that has already been voted on.

## Roles and vote terminology

- **Release Manager:** coordinates the release, creates and signs the source archive,
  starts votes, records results, and completes the post-release work.
- **Auron PPMC:** determines whether the Auron community approves submitting the RC to
  the IPMC.
- **Auron committers and contributors:** review and vote in the community; their input is
  encouraged even when it is not binding for ASF release approval.
- **Incubator PMC:** provides the binding ASF release approval required while Auron is
  incubating.

The first vote is a public **Auron community approval vote** on
`dev@auron.apache.org`; it is not a private-list vote. For that community decision,
Auron records PPMC approval votes separately from other community votes. Under ASF
Incubator policy, however, only IPMC members cast binding release votes. Binding status
does not depend on which mailing list carries the vote.

The IPMC release vote passes when it has at least three binding `+1` votes and more
binding `+1` votes than binding `-1` votes. A release vote cannot be vetoed by a single
`-1`, but every concern must be investigated and resolved transparently.

## 1. Prerequisites

### Accounts and permissions

The RM needs:

- an ASF committer account;
- write access to the Auron Git repository;
- write access to the Auron `dist/dev` directory;
- access to an ASF account permitted to promote the release into `dist/release`.

By default, committers can write to `dist/dev`, while `dist/release` is restricted to
PMC/PPMC members. If the RM cannot finalize the release, arrange for an authorized PPMC
member or mentor to run the finalize step after both votes pass.

### Local tools

Use a trusted macOS or Linux machine with:

- Git;
- Subversion (`svn`);
- GnuPG 2.x (`gpg`);
- the JDK, Maven, Rust, and other tools required by the Auron build;
- `curl`, `tar`, and either `sha512sum` (Linux) or `shasum` (macOS).

Follow the [Getting Started](/documents/getting-started) and the source repository's
[`CONTRIBUTING.md`](https://github.com/apache/auron/blob/master/CONTRIBUTING.md) for the
current build prerequisites. In particular, select a JDK supported by the Spark version
used for verification.

### GPG key

Release artifacts must be signed with an ASCII-armored detached signature. The private
key stays under the RM's control and must never be committed, uploaded, shared with an
agent, or stored in CI logs.

Display the full fingerprint:

```bash
gpg --list-secret-keys --keyid-format LONG --with-fingerprint
```

If a new key is required, generate it using the ASF-associated identity, publish the
public key through the normal ASF process, and add it to the Auron `KEYS` file before
creating the RC. Verify that the public distribution copy contains the key:

```bash
curl --fail --location --output KEYS \
  https://downloads.apache.org/incubator/auron/KEYS
gpg --show-keys --with-fingerprint KEYS
```

The distribution repositories are:

- staging: `https://dist.apache.org/repos/dist/dev/incubator/auron/`
- official releases: `https://dist.apache.org/repos/dist/release/incubator/auron/`

Keep the `KEYS` content consistent in both locations. Updating `dist/release` requires
the corresponding SVN permission.

### Security rules

- Review every command before running it, especially `svn` writes and `finalize`.
- Do not place ASF passwords, GPG private-key material, or passphrases in the repository.
- The current Auron release script requires `ASF_PASSWORD`. Export it only in the
  release shell, avoid recording it in shell history, and run `unset ASF_PASSWORD`
  immediately after the SVN operation.
- Perform signing and publication personally on trusted hardware.
- Record public evidence (commit, tag, artifact URLs, checksums, vote threads, and SVN
  revisions), never secrets.

## 2. Define the release

Open a GitHub issue for the release. Record the RM, proposed scope, target date, previous
release, compatibility notes, and this checklist. Resolve release blockers before
cutting an RC.

Define these variables in the Auron source checkout. `RELEASE_VERSION` excludes both
`incubating` and the RC suffix; `RELEASE_VERSION_FULL` is the value stored in
`pom.xml` and used in the source artifact name.

```bash
export RELEASE_VERSION="X.Y.Z"
export RELEASE_VERSION_FULL="${RELEASE_VERSION}-incubating"
export RC_NUMBER="0"
export GIT_TAG="v${RELEASE_VERSION}-rc${RC_NUMBER}"
export RC_DIRECTORY="v${RELEASE_VERSION_FULL}-rc${RC_NUMBER}"
export PREVIOUS_TAG="vPREVIOUS_VERSION"
export NEXT_VERSION="NEXT_VERSION-SNAPSHOT"
export ASF_ID="your-apache-id"
export GPG_FINGERPRINT="YOUR_FULL_40_CHARACTER_FINGERPRINT"

export STAGING_BASE="https://dist.apache.org/repos/dist/dev/incubator/auron"
export RELEASE_BASE="https://dist.apache.org/repos/dist/release/incubator/auron"
export STAGING_URL="${STAGING_BASE}/${RC_DIRECTORY}"
export RELEASE_DIR="auron-${RELEASE_VERSION_FULL}"
export SOURCE_FILE="apache-auron-${RELEASE_VERSION_FULL}-source.tgz"
```

Replace `X.Y.Z`, `PREVIOUS_VERSION`, `NEXT_VERSION`, the ASF ID, and the fingerprint
before using the block. As the release progresses, record these additional values:

| Variable | When it becomes available |
| --- | --- |
| `RELEASE_MANAGER` | Before release preparation starts |
| `RELEASE_COMMIT` | After the preparation PR is merged |
| `VOTE_CLOSE_TIME`, `VOTE_TIMEZONE` | Before sending the community vote |
| `AURON_VOTE_THREAD`, `AURON_RESULT_THREAD` | After the community emails are archived |
| `IPMC_VOTE_CLOSE_TIME`, `IPMC_VOTE_THREAD` | During the IPMC vote |
| Vote-count and voter-name variables | When drafting each result email |
| `OLD_RC_DIRECTORY` | When removing an obsolete candidate |

Check the expansion before proceeding:

```bash
printf '%s\n' \
  "Release: ${RELEASE_VERSION_FULL}" \
  "Git tag: ${GIT_TAG}" \
  "RC directory: ${RC_DIRECTORY}" \
  "Staging: ${STAGING_URL}" \
  "Artifact: ${SOURCE_FILE}" \
  "Next version: ${NEXT_VERSION}"
```

::: warning Script-derived values
`build/release/release.sh` reads the release version directly from
`<project.version>` in `pom.xml` and constructs the SVN staging directory as
`v${RELEASE_VERSION_FULL}-rcN`. This is intentionally different from Auron's Git tag,
`v${RELEASE_VERSION}-rcN`. Keep `GIT_TAG` and `RC_DIRECTORY` distinct throughout the
release.
:::

## 3. Prepare the source release

Run all source preparation commands from a clean checkout of
[`apache/auron`](https://github.com/apache/auron).

### Confirm the base commit

```bash
git switch master
git pull --ff-only origin master
git status --short --branch
git log -1 --show-signature --oneline
```

The working tree must be clean and required CI checks must pass. If the community uses a
release branch, create it through the normal reviewed workflow. Do not create an
unreviewed release-only commit outside the public repository history.

### Set the release version

Update `<project.version>` in the root `pom.xml` from the current `-SNAPSHOT` value to
the value printed by:

```bash
printf '<project.version>%s</project.version>\n' "${RELEASE_VERSION_FULL}"
```

Edit and review the POM normally; do not commit the literal shell expression. Check all
version references:

```bash
rg -n "<project.version>|SNAPSHOT" --glob 'pom.xml'
```

Submit the version change through a reviewed PR. A new RC does not automatically require
another version-bump commit: create a new commit only when source content changes.

### Review release content

Before tagging:

- confirm the intended issues and PRs are included;
- prepare release notes grouped consistently with previous Auron releases;
- acknowledge PR authors accurately;
- review compatibility, upgrade, configuration, and known-issue notes;
- verify that `LICENSE`, `NOTICE`, and `DISCLAIMER` are present and correct for the exact
  source archive contents;
- confirm source files have appropriate ASF license headers;
- confirm generated output, dependency caches, credentials, and compiled artifacts are
  not tracked.

Use the compare view as an input, not as a substitute for curated release notes:

```text
https://github.com/apache/auron/compare/${PREVIOUS_TAG}...${GIT_TAG}
```

### Run pre-release checks

At minimum, follow the current source repository contributor guide:

```bash
./dev/reformat --check
```

Run the relevant unit and integration tests and at least one clean source build using a
supported Spark/Scala/JDK combination. Record the exact commands and results in the
release issue so voters can reproduce them.

### Create the immutable RC tag

After the release preparation PR is merged, record the commit and create the tag on that
exact commit:

```bash
export RELEASE_COMMIT="$(git rev-parse HEAD)"
git status --short
git show --stat --oneline "${RELEASE_COMMIT}"
git tag -a "${GIT_TAG}" "${RELEASE_COMMIT}" \
  -m "Apache Auron ${RELEASE_VERSION_FULL} RC${RC_NUMBER}"
git show --show-signature "${GIT_TAG}"
git push origin "${GIT_TAG}"
```

Do not move or reuse this tag. If source content changes, increment `RC_NUMBER`, derive a
new `GIT_TAG` and `RC_DIRECTORY`, and tag the new reviewed commit.

## 4. Build, sign, and stage the RC

The Auron release script creates a source-only archive from `HEAD`, signs it, generates a
SHA-512 file, and commits the three files to the Auron `dist/dev` SVN directory.

First ensure `HEAD` is exactly the tagged commit:

```bash
test "$(git rev-parse HEAD)" = "$(git rev-list -n 1 "${GIT_TAG}")"
test "$(git status --porcelain)" = ""
```

The script requires `ASF_USERNAME`, `ASF_PASSWORD`, and `RELEASE_RC_NO`:

```bash
export ASF_USERNAME="${ASF_ID}"
export RELEASE_RC_NO="${RC_NUMBER}"
read -r -s -p "ASF password: " ASF_PASSWORD
echo
export ASF_PASSWORD

./build/release/release.sh publish

unset ASF_PASSWORD
```

The expected staged files are:

```text
${SOURCE_FILE}
${SOURCE_FILE}.asc
${SOURCE_FILE}.sha512
```

Inspect the SVN directory and record its revision:

```bash
svn list "${STAGING_URL}/"
svn info "${STAGING_URL}"
```

::: danger Do not overwrite a voted RC
After the vote begins, do not rerun `publish` for the same RC, replace a file, move the
tag, or alter a signature/checksum. Cancel the vote and create `rcN+1` instead.
:::

## 5. Verify the release candidate

Perform verification in a new temporary directory and preferably on more than one
platform. Binding IPMC voters must download and verify the signed source package on
their own hardware before voting `+1`.

### Download the exact staged files

```bash
VERIFY_DIR="$(mktemp -d)"
cd "${VERIFY_DIR}"

curl --fail --location --remote-name "${STAGING_URL}/${SOURCE_FILE}"
curl --fail --location --remote-name "${STAGING_URL}/${SOURCE_FILE}.asc"
curl --fail --location --remote-name "${STAGING_URL}/${SOURCE_FILE}.sha512"
curl --fail --location --output KEYS "${STAGING_BASE}/KEYS"
```

### Verify SHA-512

On Linux:

```bash
sha512sum --check "${SOURCE_FILE}.sha512"
```

On macOS:

```bash
shasum --algorithm 512 --check "${SOURCE_FILE}.sha512"
```

The command must report `${SOURCE_FILE}: OK`.

### Verify the signature and signer

Use a temporary GPG home so the test does not rely on keys already trusted locally:

```bash
export GNUPGHOME="$(mktemp -d)"
chmod 700 "${GNUPGHOME}"
gpg --import KEYS
gpg --status-fd 1 --verify "${SOURCE_FILE}.asc" "${SOURCE_FILE}"
gpg --show-keys --with-fingerprint KEYS
```

Confirm that the `VALIDSIG` fingerprint exactly equals `${GPG_FINGERPRINT}`. A valid
cryptographic signature does not by itself establish identity; confirm the fingerprint
through the ASF identity and project `KEYS` records.

### Inspect the archive

```bash
tar -tzf "${SOURCE_FILE}" | sed -n '1,40p'
mkdir source
tar -xzf "${SOURCE_FILE}" -C source
cd "source/apache-auron-${RELEASE_VERSION_FULL}-source"
```

Verify:

- exactly one top-level directory exists and its name includes `incubating`;
- `LICENSE`, `NOTICE`, and `DISCLAIMER` exist at the archive root and match its contents;
- source headers are correct;
- no credentials, VCS metadata, caches, or editor files are present;
- no unexpected compiled files such as `.class`, `.jar`, `.so`, `.dll`, or `.dylib` are
  bundled;
- all version strings identify the intended release and not a development snapshot.

A useful first-pass binary scan is:

```bash
find . -type f \( \
  -name '*.class' -o -name '*.jar' -o -name '*.so' -o \
  -name '*.dll' -o -name '*.dylib' -o -name '*.exe' \
\) -print
```

Review every result; an empty result is expected for the Auron source-only artifact.

### Compare the archive with the tag

Because Auron uses `git archive` to create the source package, compare file lists and
content against the recorded RC tag. For example:

```bash
cd "${VERIFY_DIR}"
git clone --no-checkout https://github.com/apache/auron.git tag-check
git -C tag-check checkout --detach "${GIT_TAG}"
git -C tag-check archive \
  --prefix="apache-auron-${RELEASE_VERSION_FULL}-source/" \
  --output expected.tgz "${GIT_TAG}"

mkdir expected
tar -xzf expected.tgz -C expected
diff -ruN \
  "expected/apache-auron-${RELEASE_VERSION_FULL}-source" \
  "${VERIFY_DIR}/source/apache-auron-${RELEASE_VERSION_FULL}-source"
```

The recursive diff must be empty.

### Build from the source archive

Run the formatting checks and a release build using combinations documented in the
current contributor guide. At minimum:

```bash
cd "${VERIFY_DIR}/source/apache-auron-${RELEASE_VERSION_FULL}-source"
./dev/reformat --check
./auron-build.sh --release --sparkver 3.5 --scalaver 2.12 --skiptests false
```

Adjust the Spark/Scala/JDK matrix to match the release scope, and record every command,
platform, JDK, and result in the vote reply.

Do not start the vote until the signature, checksum, legal, content, version, tag
comparison, and clean-build checks all pass.

## 6. Auron community vote

Send a new plain-text email to `dev@auron.apache.org`. The vote is public and should
remain open for at least 72 hours. Use an explicit closing timestamp and timezone; do
not rely only on “72 hours from now.”

For the Auron community decision, list PPMC approval votes separately from other
community votes. Under the current Auron process, proceed when the vote has remained
open for at least 72 hours, has at least three PPMC `+1` approval votes, and has more
PPMC `+1` than PPMC `-1` votes. Do not describe PPMC membership alone as ASF binding
release approval. If a voter is also an IPMC member, note that fact separately.

### Community `[VOTE]` template

```text
Subject: [VOTE] Release Apache Auron (Incubating) ${RC_DIRECTORY}

Hello Auron community,

This is a call for vote to release Apache Auron (Incubating)
${RELEASE_VERSION_FULL}, release candidate ${RC_DIRECTORY}.

The release candidate:
${STAGING_URL}/

The source artifact:
${STAGING_URL}/${SOURCE_FILE}

Git tag:
https://github.com/apache/auron/releases/tag/${GIT_TAG}

Git commit:
${RELEASE_COMMIT}

SHA-512 file:
${STAGING_URL}/${SOURCE_FILE}.sha512

Signature:
${STAGING_URL}/${SOURCE_FILE}.asc

The source artifact is signed with this GPG fingerprint:
${GPG_FINGERPRINT}

KEYS:
${STAGING_BASE}/KEYS

Changelog:
https://github.com/apache/auron/compare/${PREVIOUS_TAG}...${GIT_TAG}

The vote will remain open for at least 72 hours and will close at:
${VOTE_CLOSE_TIME} (${VOTE_TIMEZONE})

Please vote:
[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove (please explain the concern)

Release checklist:
https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist

Verification guidance:
https://www.apache.org/info/verification.html

Thanks,
${RELEASE_MANAGER}
```

Before sending, replace every `${...}` token with its concrete value. Mailing-list
readers cannot expand shell variables.

### Count and close the community vote

After the stated deadline:

1. Review the complete thread, including late corrections and withdrawn votes.
2. Verify PPMC membership from the current Auron roster.
3. Verify IPMC membership separately before marking anyone as an ASF binding voter.
4. List PPMC approval votes and other community votes separately.
5. Reply in the original thread with the result; do not silently close the vote.

### Community `[RESULT][VOTE]` template

```text
Subject: [RESULT][VOTE] Release Apache Auron (Incubating) ${RC_DIRECTORY}

Hello Auron community,

The Auron community vote to release Apache Auron (Incubating)
${RELEASE_VERSION_FULL}, release candidate ${RC_DIRECTORY}, has concluded.

PPMC approval votes:
+1 ${PPMC_VOTER_1}
+1 ${PPMC_VOTER_2}
+1 ${PPMC_VOTER_3}

Other community votes (non-binding):
+1 ${COMMUNITY_VOTER_1}

+0 votes:
None

-1 votes:
None

Any voters who are also IPMC members:
${IPMC_VOTERS_OR_NONE}

Vote thread:
${AURON_VOTE_THREAD}

The Auron community approves submitting this release candidate to the
Incubator PMC for ASF release approval.

Thanks,
${RELEASE_MANAGER}
```

Adjust the lists and totals to the actual thread. Do not say “no `-1`” if a negative vote
was cast and later resolved or withdrawn; describe what happened and link to the reply.

## 7. Incubator PMC vote

After the Auron community approves the RC, send a new plain-text vote email to
`general@incubator.apache.org`. Link both the community vote and its result. This is the
ASF binding approval stage: only IPMC member votes are binding.

It is acceptable to invite people to **review and vote**. Do not privately ask for an
unconditional `+1`; each binding voter must independently download, verify, build, and
test the signed source package.

### IPMC `[VOTE]` template

```text
Subject: [VOTE] Release Apache Auron (Incubating) ${RC_DIRECTORY}

Hello Incubator Community,

The Apache Auron community has voted on and approved the release of
Apache Auron (Incubating) ${RELEASE_VERSION_FULL}, release candidate
${RC_DIRECTORY}.

We now request the Incubator PMC to review and vote on this release
candidate.

Auron community vote thread:
${AURON_VOTE_THREAD}

Auron community vote result thread:
${AURON_RESULT_THREAD}

The release candidate:
${STAGING_URL}/

Release artifacts:
- ${SOURCE_FILE}
- ${SOURCE_FILE}.asc
- ${SOURCE_FILE}.sha512

Git tag:
https://github.com/apache/auron/releases/tag/${GIT_TAG}

Git commit:
${RELEASE_COMMIT}

GPG fingerprint:
${GPG_FINGERPRINT}

KEYS:
${STAGING_BASE}/KEYS

Changelog:
https://github.com/apache/auron/compare/${PREVIOUS_TAG}...${GIT_TAG}

The vote will remain open for at least 72 hours and will close at:
${IPMC_VOTE_CLOSE_TIME} (${VOTE_TIMEZONE})

Please vote:
[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove (please explain the concern)

Incubator release checklist:
https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist

Verification guidance:
https://www.apache.org/info/verification.html

Thanks,
${RELEASE_MANAGER}
On behalf of the Apache Auron (Incubating) community
```

### Determine whether the IPMC vote passes

After at least 72 hours:

- verify each claimed binding voter against the current IPMC roster;
- require at least three binding `+1` votes;
- require more binding `+1` votes than binding `-1` votes;
- record all non-binding votes as valuable community review;
- investigate and respond to every negative vote;
- publish the result in the original IPMC thread.

### IPMC `[RESULT][VOTE]` template

```text
Subject: [RESULT][VOTE] Release Apache Auron (Incubating) ${RC_DIRECTORY}

Hello Incubator Community,

The vote to release Apache Auron (Incubating) ${RELEASE_VERSION_FULL},
release candidate ${RC_DIRECTORY}, has passed with ${BINDING_PLUS_ONE_COUNT}
binding +1 votes, ${BINDING_ZERO_COUNT} binding +0 votes, and
${BINDING_MINUS_ONE_COUNT} binding -1 votes.

Binding votes (IPMC members):
+1 ${IPMC_VOTER_1}
+1 ${IPMC_VOTER_2}
+1 ${IPMC_VOTER_3}

Non-binding votes:
+1 ${NON_BINDING_VOTER_1}

Vote thread:
${IPMC_VOTE_THREAD}

Thanks for reviewing and voting on the release candidate. We will now
publish the approved artifacts and send the release announcement.

Thanks,
${RELEASE_MANAGER}
On behalf of the Apache Auron (Incubating) community
```

Replace the example lists with the real votes. If there were `+0`, `-1`, withdrawn, or
ambiguous votes, report them accurately rather than retaining the example wording.

## 8. Finalize the release

::: danger Irreversible publication step
Do not run `finalize` until the Auron community result and the passing IPMC result are
publicly archived. Check the exact RC tag, commit, source filename, GPG fingerprint, and
SVN staging revision again. The script performs an SVN move into `dist/release`.
:::

Re-verify the staged artifact immediately before promotion. Then run from the same Auron
source checkout whose `pom.xml` contains `${RELEASE_VERSION_FULL}`:

```bash
export ASF_USERNAME="${ASF_ID}"
export RELEASE_RC_NO="${RC_NUMBER}"
read -r -s -p "ASF password: " ASF_PASSWORD
echo
export ASF_PASSWORD

./build/release/release.sh finalize

unset ASF_PASSWORD
```

The script moves:

```text
${STAGING_BASE}/${RC_DIRECTORY}
```

to:

```text
${RELEASE_BASE}/auron-${RELEASE_VERSION_FULL}
```

Record the SVN revision and verify the official distribution directory:

```bash
svn info "${RELEASE_BASE}/auron-${RELEASE_VERSION_FULL}"
svn list "${RELEASE_BASE}/auron-${RELEASE_VERSION_FULL}/"
```

Do not manually rebuild or re-sign after promotion. The public artifact must be the exact
artifact approved by the votes.

## 9. Wait for public distribution

The canonical public distribution is `downloads.apache.org`; the CDN is
`dlcdn.apache.org`. Directory listings and the download helper may be cached even after
the file is available. ASF Infrastructure recommends checking `downloads.apache.org`
and waiting about one hour before announcing general availability.

Verify all three public files:

```text
https://downloads.apache.org/incubator/auron/auron-${RELEASE_VERSION_FULL}/${SOURCE_FILE}
https://downloads.apache.org/incubator/auron/auron-${RELEASE_VERSION_FULL}/${SOURCE_FILE}.asc
https://downloads.apache.org/incubator/auron/auron-${RELEASE_VERSION_FULL}/${SOURCE_FILE}.sha512
```

Use the Apache download helper for the source-download link on the website:

```text
https://www.apache.org/dyn/closer.lua/incubator/auron/auron-${RELEASE_VERSION_FULL}/${SOURCE_FILE}
```

The helper may recommend a direct CDN URL such as:

```text
https://dlcdn.apache.org/incubator/auron/auron-${RELEASE_VERSION_FULL}/${SOURCE_FILE}
```

Use `downloads.apache.org` HTTPS links for `KEYS`, `.asc`, and `.sha512`. Historical
releases remain available from:

```text
https://archive.apache.org/dist/incubator/auron/
```

Do not announce until the source download, signature, checksum, and `KEYS` URLs work from
a clean browser session.

## 10. Publish the GitHub release and website

### GitHub release

Create the GitHub Release from the already-voted `${GIT_TAG}`. Do not create a new source
archive through GitHub and do not present GitHub-generated archives as ASF release
artifacts. Publish the curated release notes and link users to the Auron website's ASF
download page.

### Auron website

In `apache/auron-sites`:

1. Add `docs/archives/v${RELEASE_VERSION_FULL}.md` using the preceding release page as
   the structural reference.
2. Add the release to `docs/archives/all-releases.md`.
3. Add it to the Archive sidebar and navbar in `docs/.vuepress/config.ts`.
4. Use `closer.lua` for the source download and `downloads.apache.org` for `KEYS`, the
   detached signature, and checksum.
5. Link the exact voted Git tag and curated release notes.
6. Run `npm run build` and inspect the generated page and all links.

The release date shown on the website should be the date the release becomes publicly
available, normally the announcement date—not the RC creation date or vote start date.

## 11. Announce the release

Send the announcement only after the official files and website page are publicly
available. Send a plain-text message to:

- `announce@apache.org`
- `dev@auron.apache.org`

You may also notify `general@incubator.apache.org` according to current Incubator
practice. Do not copy `private@auron.apache.org`; release announcements are public.

::: warning Plain text is required
Send the announcement as `text/plain`. Disable rich-text/HTML mode in the mail client.
Messages sent as HTML may be rejected by `announce@apache.org`. Keep the subject on one
line and use plain URLs.
:::

### `[ANNOUNCE]` template

```text
Subject: [ANNOUNCE] Apache Auron (Incubating) ${RELEASE_VERSION} available

Hi all,

The Apache Auron (Incubating) community is pleased to announce the
release of Apache Auron (Incubating) ${RELEASE_VERSION}.

Apache Auron is dedicated to improving the efficiency and elasticity of
data-processing engines. It provides a high-performance native execution
engine and intermediate-data services, including shuffle data, spilled
data, and result data. Auron currently supports Apache Spark and improves
the performance, stability, and elasticity of Spark jobs.

Download and release notes:
https://auron.apache.org/archives/v${RELEASE_VERSION_FULL}.html

Auron provides a source release. Users can build it with the environment
and options appropriate for their deployment.

GitHub release tag:
https://github.com/apache/auron/releases/tag/${GIT_TAG}

Website:
https://auron.apache.org/

Resources:
Issues: https://github.com/apache/auron/issues
Mailing list: dev@auron.apache.org

Kind regards,
${RELEASE_MANAGER}
On behalf of the Apache Auron (Incubating) community
```

Verify that the announcement appears in the ASF mailing-list archive. If a recipient
rejects it, read the bounce details, correct the MIME format or sender issue, and resend;
do not assume delivery from the local Sent folder.

## 12. Post-release tasks

### Move to the next development version

Update the source repository's `<project.version>` to `${NEXT_VERSION}` in a reviewed PR.
Update workflow or documentation version assumptions only where they are explicitly tied
to the released development line. Run the repository's formatting and relevant tests.

### Remove obsolete RCs

After the official release is safely published, remove failed and obsolete RC directories
from `dist/dev`:

```bash
svn delete "${STAGING_BASE}/${OLD_RC_DIRECTORY}" \
  --message "Remove obsolete Apache Auron ${OLD_RC_DIRECTORY} release candidate"
```

Never delete evidence while a vote is active. Mailing-list records, Git commits, and tags
provide the durable audit trail even after staging artifacts are removed.

### Retire old public releases

Keep the latest release for each actively maintained branch in `dist/release`. When a
release is no longer recommended, remove it from `dist/release` and the current-download
page; ASF automatically retains it on `archive.apache.org`. Do not manually upload a
second copy to the archive.

### Close the release issue

Record:

- release commit and RC tag;
- staging and final SVN revisions;
- source artifact URL and SHA-512;
- signing-key fingerprint;
- Auron vote and result threads;
- IPMC vote and result threads;
- GitHub Release and website page;
- announcement thread;
- next-version PR;
- cancelled RCs, corrections, or process improvements.

## 13. Failure and recovery guide

| Situation | Required response |
| --- | --- |
| Local verification fails before upload | Fix the source or release tooling, obtain review, and rebuild. The RC number can remain unchanged only if nothing was published or announced for voting. |
| An incorrect RC was staged but no vote started | Remove the staging directory, fix the problem, create a new immutable tag, and use `rcN+1` to avoid ambiguity. |
| A problem is found after voting starts | Reply in the vote thread to cancel the vote. Do not replace files. Fix the issue, increment the RC number, create a new tag and staged directory, verify again, and start a new vote. |
| A vote has too few required approvals after 72 hours | Reply in the thread that the vote remains open and give a new explicit closing time. Do not announce a pass early. |
| A voter posts `-1` | Acknowledge and investigate the concern. A release vote has no single-vote veto, but correctness and consensus matter; cancel the RC if its artifact or compliance is defective. |
| A vote email has an incorrect link or value | Post a clearly labelled correction in the same thread. If the artifact being voted on is ambiguous, cancel and restart the vote. |
| A voter or RM proposes changing the staged artifact | Do not change it. Any byte-level change requires a new RC and new votes. |
| A vote was sent as a new thread accidentally | Reply with links that establish the authoritative thread, or restart if the record is ambiguous. Keep all corrections public. |
| `finalize` fails | Inspect both SVN URLs and the SVN revision before retrying. Determine whether the move was partially or fully committed. Never rerun blindly. |
| The wrong RC was finalized | Notify the Auron PPMC, mentors, and IPMC immediately. Follow ASF/Infra guidance to withdraw it; never silently overwrite it. |
| Public mirrors have not updated | Delay the website switch and announcement. Check `downloads.apache.org`, then allow the documented cache interval before retesting. |
| `announce@apache.org` rejects the message | Read the bounce, convert the email to plain text, verify the sender and recipients, and resend. Confirm delivery in the archive. |
| The announcement contains a material error | Send a concise `[CORRECTION]` message to the same public lists and retain links to both messages. |
| The RM cannot continue | Announce the handoff on `dev@auron.apache.org`. Give the new RM all public commit, artifact, vote, and SVN references, but no passwords or private keys. |

## 14. Release Manager checklist

### Preparation

- [ ] Release issue, RM, scope, and target date are public.
- [ ] Release variables expand to the intended names and URLs.
- [ ] GPG fingerprint is published in Auron `KEYS`.
- [ ] Required Git and SVN permissions are confirmed.
- [ ] Version, release notes, `LICENSE`, `NOTICE`, and `DISCLAIMER` are reviewed.
- [ ] Formatting, tests, and clean source builds pass.
- [ ] The RC tag points to the reviewed release commit and will not move.

### Candidate

- [ ] Source archive, `.asc`, and `.sha512` exist in the RC staging directory.
- [ ] SHA-512 succeeds on the downloaded artifact.
- [ ] GPG reports `VALIDSIG` for the expected full fingerprint.
- [ ] Archive contents and legal files pass review.
- [ ] No unexpected compiled files are bundled.
- [ ] Archive content matches the RC tag.
- [ ] A clean build from the source archive succeeds.

### Votes

- [ ] Auron community vote stayed open for at least 72 hours.
- [ ] The Auron result distinguishes PPMC approval from other community votes.
- [ ] The Auron vote and result thread links are recorded.
- [ ] IPMC vote stayed open for at least 72 hours.
- [ ] At least three IPMC binding `+1` votes were verified.
- [ ] Binding `+1` votes outnumber binding `-1` votes.
- [ ] The IPMC result thread is public and recorded.

### Publication

- [ ] The exact voted artifact was moved to `dist/release`.
- [ ] Source, signature, checksum, and `KEYS` work on `downloads.apache.org`.
- [ ] The recommended wait for CDN/helper caches elapsed.
- [ ] GitHub Release uses the voted RC tag and links to the ASF download page.
- [ ] Auron website release page and archive list are published and verified.
- [ ] Plain-text announcement was delivered and archived.
- [ ] Obsolete RCs and superseded public releases were cleaned up safely.
- [ ] The source version was advanced to `${NEXT_VERSION}`.
- [ ] The release issue contains the complete audit trail and is closed.

## References

- [ASF Release Policy](https://www.apache.org/legal/release-policy.html)
- [ASF Voting Process](https://www.apache.org/foundation/voting.html)
- [ASF Release Creation Process](https://infra.apache.org/release-publishing.html)
- [ASF Release Distribution Policy](https://infra.apache.org/release-distribution.html)
- [ASF Release Download Pages](https://infra.apache.org/release-download-pages.html)
- [ASF Verification Guide](https://www.apache.org/info/verification.html)
- [Incubator Release Management](https://incubator.apache.org/guides/releasemanagement.html)
- [Incubator PPMC and Binding Votes](https://incubator.apache.org/guides/ppmc.html#ppmc-and-binding-votes)
- [Incubator Release Checklist](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist)
- [Auron source repository](https://github.com/apache/auron)
- [Auron mailing-list archives](https://lists.apache.org/list.html?dev@auron.apache.org)
- [Incubator general-list archives](https://lists.apache.org/list.html?general@incubator.apache.org)
- [Auron release archive](/archives/all-releases)
