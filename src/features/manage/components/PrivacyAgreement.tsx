import React, { useEffect, useState } from 'react';
import {
  Divider,
  Card,
  Button,
  Popconfirm,
  message,
  Typography,
  Modal,
  Input,
} from 'antd';
import { Document, useLoadPrivacyAgreement, useUpdateDocument } from '../redux';
import { UserField, useDidUpdateEffect, PendingModal } from '../../shared';

const { TextArea } = Input;

// const EditDocument = ({
//   show,
//   handleCancel,
//   document,
// }: {
//   show: boolean;
//   handleCancel: () => void;
//   document: Document;
// }) => {
//   return (
//     <Modal title="Edit" visible={show} onCancel={handleCancel}>
//       <p style={{ whiteSpace: 'pre-wrap' }}>{document.content}</p>
//     </Modal>
//   );
// };

const EditDocument = ({
  show,
  handleCancel,
  document,
}: {
  show: boolean;
  handleCancel: () => void;
  document: Document;
}) => {
  const { updateDocument, result, pending } = useUpdateDocument();
  const [content, setContent] = useState(document.content);

  useDidUpdateEffect(() => {
    if (result) {
      message.info('Save successfully');
      handleCancel();
    }
  }, [result]);

  const handleUpdate = () => {
    updateDocument({ ...document, content });
  };

  return (
    <div>
      <TextArea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        autoSize
      />
      <div>
        <div style={{ float: 'right', marginTop: 20 }}>
          <Popconfirm
            title="Really want to save?"
            onConfirm={handleUpdate}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              loading={pending}
              style={{ marginRight: 12 }}
              type="primary"
            >
              Save
            </Button>
          </Popconfirm>

          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

const PrivacyAgreement = () => {
  const [editing, setEditing] = useState(false);
  const { loadPrivacyAgreement, privacyAgreement, pending } =
    useLoadPrivacyAgreement();

  useEffect(() => {
    loadPrivacyAgreement();
  }, []);

  const handleClose = () => {
    setEditing(false);
  };

  return (
    <div style={{ background: '#fff', marginTop: 16 }}>
      {/* {userAgreement ? (
        <EditDocument
          show={editing}
          document={userAgreement}
          handleCancel={handleClose}
        />
      ) : null} */}
      <Card
        title="Privacy Agreement"
        extra={
          !pending && !editing ? (
            <a
              href="#"
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </a>
          ) : null
        }
        loading={pending}
      >
        {privacyAgreement ? (
          <div>
            {!editing ? (
              <p
                style={{
                  whiteSpace: 'pre-wrap',
                  //   maxHeight: 1000,
                  //   overflow: 'scroll',
                }}
              >
                {privacyAgreement.content}
              </p>
            ) : (
              <EditDocument
                show={editing}
                document={privacyAgreement}
                handleCancel={handleClose}
              />
            )}
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default PrivacyAgreement;
