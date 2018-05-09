# Polydesk

Polydesk is currently in very early development as a cloud-based document
management platform.

## Documents

Documents are stored in the highly available and durable AWS S3. High
availability ensures your documents are always accessible with a 99.99%
availability SLA. The "nine 9s" (99.999999999%) durability SLA ensures that
data loss is kept to an absolute minimum.

## Metadata

Data about your documents, called metadata, are stored in the powerful
multi-model database, ArangoDB. ArangoDB is a NoSQL database (that is to
say it does not use SQL and is not a relational database). Metadata is stored
in document storage (here, document refers to a JSON document).

On top of the data storage layer is a logical layer that provides various
metadata field types such as plain text strings, numbers, high-precision
numbers, and formulas. There are also list types, which can be of any
non-formula data type. Metadata formulas use a simple mathematical syntax
and may use simple functions such as `sum()`.
